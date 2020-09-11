import {Injectable} from '@angular/core';
import {ModelProviderService} from './model-provider.service';
import {Router} from '@angular/router';
import {AuthenticationResourceService, LoginForm, UserDTO} from '../songbook';
import {environment} from '../../environments/environment';
import {AsyncSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private static getTokenName() {
    return 'id_token' + environment.version;
  }

  constructor(private authService: AuthenticationResourceService, private modelProvider: ModelProviderService, private router: Router) {
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
    this.router.navigateByUrl('login');
  }

  // todo should check on the server if it's valid
  isLoggedIn(): boolean {
    return localStorage.getItem(LoginService.getTokenName()) != null;
  }

  getToken(): string {
    return localStorage.getItem(LoginService.getTokenName());
  }
}
