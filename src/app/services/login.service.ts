import {Injectable} from '@angular/core';
import {ModelProviderService} from './model-provider.service';
import {Router} from '@angular/router';
import {AuthenticationResourceService, LoginForm, UserDTO} from '../songbook';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  constructor(private authService: AuthenticationResourceService, private modelProvider: ModelProviderService, private router: Router) {
    this.userSubject = new BehaviorSubject<UserDTO>(this.user);
    this.userObservable = this.userSubject.asObservable();
  }

  public get userValue(): UserDTO {
    return this.userSubject.value;
  }

  login() {
    if (this.modelProvider.login == null || this.modelProvider.password == null) {
      return;
    }
    const loginForm: LoginForm = {password: this.modelProvider.password, login: this.modelProvider.login};
    this.authService.authenticateUsingPOST(loginForm).subscribe(observer => {
        if (observer.idToken) {
          localStorage.setItem(LoginService.getTokenName(), observer.idToken);
          this.modelProvider.password = null;
          this.fetchUser(this.setLoggedUser);
          if (this.modelProvider.requestedUrl != null) {
            this.router.navigateByUrl(this.modelProvider.requestedUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        }
      }
    );
  }

  logout() {
    localStorage.removeItem(LoginService.getTokenName());
    this.modelProvider.login = null;
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
}
