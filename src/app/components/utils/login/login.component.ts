import { Component, OnInit } from '@angular/core';
import {ModelProviderService} from '../../../services/model-provider.service';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, public modelProvider: ModelProviderService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login();
  }

}
