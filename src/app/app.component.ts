import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './services/login.service';
import {AuthenticationResourceService, UserDTO} from './songbook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'songbook-angular-client';

  user: UserDTO;

  constructor(private router: Router, private loginService: LoginService, private authService: AuthenticationResourceService) {
    this.authService.getAccountUsingGET().subscribe(res => this.user = res);
  }

  logout() {
    this.loginService.logout();
  }

  showLandingPage() {
    this.router.navigateByUrl('');
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  register() {
    this.router.navigateByUrl('register');
  }

  login() {
    this.router.navigateByUrl('login');
  }

  getProfile() {
    this.router.navigateByUrl('profile');
  }

  profileImg() {
    if (this.user) {
      return this.user.imageUrl;
    } else {
      return '';
    }
  }

  username() {
    return this.user ? this.user.username : '';
  }

  showContact() {

  }

  showStk() {

  }
}
