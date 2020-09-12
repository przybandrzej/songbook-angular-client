import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {LoginForm} from '../../../songbook';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: LoginForm = {};

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.form.login, this.form.password, undefined);
  }

}
