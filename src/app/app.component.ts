import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'songbook-angular-client';

  constructor(private router: Router, private loginService: LoginService) {
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
}
