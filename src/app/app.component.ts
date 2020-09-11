import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {AuthenticationResourceService, UserDTO} from './songbook';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'songbook-angular-client';

  userObservable: Observable<UserDTO>;

  constructor(private loginService: LoginService, private authService: AuthenticationResourceService) {
  }

  ngOnInit(): void {
    this.userObservable = this.authService.getAccountUsingGET();
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
}
