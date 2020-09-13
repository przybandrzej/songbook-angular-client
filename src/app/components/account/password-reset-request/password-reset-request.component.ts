import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {

  email: string;

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  request() {
    this.service.requestResetPassword(this.email);
  }
}
