import {Injectable} from '@angular/core';
import {Role} from '../model/user-role';
import {environment} from '../../environments/environment';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {AuthenticationResourceService, LoginForm, PasswordChangeDTO, TokenAndPasswordDTO, UserDTO} from '../songbook';
import {Router} from '@angular/router';

const TOKEN_NAME = 'id_token' + environment.version;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: ReplaySubject<boolean>;
  private readonly loggedIn$: Observable<boolean>;
  private userSubject: ReplaySubject<UserDTO>;
  private readonly user$: Observable<UserDTO>;
  private lastUser: UserDTO;

  private counterSubscription: Subscription;

  private static setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  private static removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }

  public static getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  constructor(private authService: AuthenticationResourceService, private router: Router) {
    this.userSubject = new ReplaySubject<UserDTO>(1);
    this.user$ = this.userSubject.asObservable();
    this.loggedInSubject = new ReplaySubject<boolean>(1);
    this.loggedIn$ = this.loggedInSubject.asObservable();
    this.setLogged(this.checkTokenNotExpired());
    // this.authService.isAuthenticatedUsingGET().subscribe(value => this.setLogged(value));
  }

  private setLogged(value: boolean): void {
    if (value) {
      this.setLoggedIn();
    } else {
      this.setLoggedOut();
    }
  }

  public login(loginForm: LoginForm, requestedUrl: string): void {
    console.log('enter login()');
    this.authService.authenticateUsingPOST(loginForm).subscribe(observer => {
        if (observer.idToken) {
          AuthService.setToken(observer.idToken);
          this.setLoggedIn();
          if (requestedUrl != null) {
            this.router.navigateByUrl(requestedUrl);
          } else {
            this.router.navigateByUrl('/');
          }
          console.log('finish login()');
        }
      }
    );
  }

  public logout(): void {
    this.setLoggedOut();
    this.router.navigateByUrl('login');
  }

  // todo validate?
  public requestResetPassword(mail: string): void {
    this.authService.requestPasswordResetUsingPOST(mail).subscribe();
  }

  // todo validate?
  public completePasswordReset(passReset: TokenAndPasswordDTO): void {
    this.authService.finishPasswordResetUsingPOST(passReset).subscribe();
  }

  // todo validate?
  public changePassword(passChange: PasswordChangeDTO): void {
    this.authService.changePasswordUsingPOST(passChange).subscribe();
  }

  public activateAccount(activationKey: string): void {
    this.authService.activateAccountUsingGET(activationKey).subscribe();
  }

  public get loggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  public get user(): Observable<UserDTO> {
    return this.user$;
  }

  private checkTokenNotExpired(): boolean {
    if (AuthService.getToken()) {
      const expiration = +JSON.parse(atob(AuthService.getToken().split('.')[1])).expiration_in_milliseconds;
      return (expiration - new Date().getTime()) > 0;
    }
    return false;
  }

  public setLoggedOut(): void {
    console.log('set logged out');
    AuthService.removeToken();
    this.loggedInSubject.next(false);
    this.setUser(null);
    this.stopCounting();
  }

  public setLoggedIn(): void {
    console.log('set logged in');
    this.loggedInSubject.next(true);
    if (!this.lastUser) {
      this.authService.getAccountUsingGET().subscribe(user => this.setUser(user));
    }
    this.startCounting();
  }

  private setUser(user: UserDTO): void {
    this.lastUser = user;
    this.userSubject.next(this.lastUser);
  }

  public getUserRole(): string {
    if (AuthService.getToken() && this.checkTokenNotExpired()) {
      return JSON.parse(atob(AuthService.getToken().split('.')[1])).auth;
    }
    return undefined;
  }

  public isSuperuser(): boolean {
    return this.hasRole(Role.Superuser);
  }

  public isAdmin(): boolean {
    return this.hasRole(Role.Admin) || this.isSuperuser();
  }

  public isModerator(): boolean {
    return this.hasRole(Role.Moderator) || this.isAdmin();
  }

  private hasRole(role: Role): boolean {
    return this.getUserRole() === role;
  }

  private startCounting(): void {
    this.counterSubscription = new Observable<boolean>(observer => {
      const now = new Date().getTime();
      const delay = +JSON.parse(atob(AuthService.getToken().split('.')[1])).expiration_in_milliseconds - now;
      setTimeout(() => {
        observer.next(false);
        observer.complete();
      }, delay);
    }).subscribe(loggedOut => {
      this.authService.isAuthenticatedUsingGET().subscribe(authenticated => {
        if (authenticated === loggedOut) {
          alert('Your session has been ended!');
          this.setLogged(loggedOut);
          this.router.navigateByUrl('login');
        }
      });
    });
  }

  private stopCounting(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
