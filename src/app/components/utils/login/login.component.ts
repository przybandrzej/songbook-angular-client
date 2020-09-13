import {Component, OnInit} from '@angular/core';
import {LoginForm} from '../../../songbook';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: LoginForm = {};

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.form, undefined);
  }

}
