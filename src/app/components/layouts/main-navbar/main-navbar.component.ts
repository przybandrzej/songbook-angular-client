import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UserDTO} from '../../../songbook';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit, OnDestroy {

  user: UserDTO;
  loggedIn: boolean;

  username = '';
  profileImgUrl = '';
  siteName = environment.applicationName;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.authService.user.subscribe(user => {
          this.user = user;
          if (user) {
            this.username = user.username;
            this.profileImgUrl = user.imageUrl;
          } else {
            this.username = '';
            this.profileImgUrl = '';
          }
        });
      }
    });
  }

  ngOnDestroy(): void {

  }

  showLandingPage() {
    this.router.navigateByUrl('');
  }

  register() {
    this.router.navigateByUrl('register');
  }

  login() {
    this.router.navigateByUrl('login');
  }

  expandUserMenu() {
    this.router.navigateByUrl('profile');
  }

  logout() {
    this.authService.logout();
  }
}
