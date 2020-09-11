import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UserDTO} from '../../../songbook';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  @Input()
  userObservable: Observable<UserDTO>;
  @Input()
  loggedIn: boolean;
  @Output()
  logOutEvent = new EventEmitter();

  username = '';
  profileImgUrl = '';
  siteName = environment.applicationName;
  private userId: number;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.userObservable.subscribe(user => {
      this.username = user.username;
      this.profileImgUrl = user.imageUrl;
      this.userId = user.id;
    });
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

  }

  logout(event) {
    this.logOutEvent.emit(event);
  }
}
