import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'songbook-angular-client';

  constructor(private router: Router) {
  }

  logout() {
    // todo
    // this.loginService.logOut();
  }

  showLandingPage() {
    this.router.navigateByUrl('');
  }
}
