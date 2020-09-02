import {Injectable} from '@angular/core';
import {ModelProviderService} from './model-provider.service';
import {Router} from '@angular/router';
import {AuthenticationResourceService, LoginForm} from '../songbook';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private static getTokenName() {
    return 'id_token' + environment.version;
  }

  constructor(private loginService: AuthenticationResourceService, private modelProvider: ModelProviderService, private router: Router) {
  }

  login() {
    if (this.modelProvider.login == null || this.modelProvider.password == null) {
      return;
    }
    const loginForm: LoginForm = {password: this.modelProvider.password, login: this.modelProvider.login};
    this.loginService.authenticateUsingPOST(loginForm).subscribe(observer => {
        console.log(observer);
        console.log('Token: ' + observer.idToken);
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

  isLoggedIn(): boolean {
    return localStorage.getItem(LoginService.getTokenName()) != null;
  }

  getToken(): string {
    return localStorage.getItem(LoginService.getTokenName());
  }
}
