import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationResourceService, LoginForm, UserDTO} from '../songbook';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Role} from '../model/user-role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject: BehaviorSubject<UserDTO>;
  private userObservable: Observable<UserDTO>;
  private user: UserDTO;

  private static getTokenName() {
    return 'id_token' + environment.version;
  }

  constructor(private authService: AuthenticationResourceService, private router: Router) {
    this.userSubject = new BehaviorSubject<UserDTO>(this.user);
    this.userObservable = this.userSubject.asObservable();
  }

  public get userValue(): UserDTO {
    return this.userSubject.value;
  }

  login(login: string, password: string, requestedUrl: string) {
    if (login == null || password == null) {
      return;
    }
    const loginForm: LoginForm = {login, password};
    this.authService.authenticateUsingPOST(loginForm).subscribe(observer => {
        if (observer.idToken) {
          localStorage.setItem(LoginService.getTokenName(), observer.idToken);
          this.fetchUser(this.setLoggedUser);
          if (requestedUrl != null) {
            this.router.navigateByUrl(requestedUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        }
      }
    );
  }

  logout() {
    localStorage.removeItem(LoginService.getTokenName());
    this.user = null;
    this.userSubject.next(null);
    this.router.navigateByUrl('login');
  }

  // todo should check on the server if the token is valid
  isLoggedIn(): boolean {
    if (this.getToken() && !this.userValue) {
      localStorage.removeItem(LoginService.getTokenName());
      return false;
    } else if (this.getToken() && this.userValue) {
      return true;
    } else if (!this.getToken() && this.userValue) {
      this.user = null;
      this.userSubject.next(null);
      return false;
    } else {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem(LoginService.getTokenName());
  }

  private fetchUser(callback): Observable<UserDTO> {
    return this.authService.getAccountUsingGET().pipe(
      map(userDetails => {
        if (callback) {
          callback(userDetails);
        }
        return userDetails;
      }));
  }

  private setLoggedUser(user: UserDTO) {
    this.user = user;
    this.userSubject.next(this.user);
  }

  public getUserRole(): string {
    if (this.getToken()) {
      return JSON.parse(atob(this.getToken().split('.')[1])).auth;
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
}
