import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {

  public emailForm = new FormControl('', [Validators.email, Validators.required]);

  email: string;
  message = '';
  isError = false;
  errorMessage = '';

  constructor(private service: AuthService) {
  }

  ngOnInit(): void {
  }

  request() {
    this.isError = false;
    this.message = '';
    if (!this.email || this.emailForm.hasError('required') || this.emailForm.hasError('email')) {
      this.isError = true;
      this.errorMessage = 'Please provide a valid email address.';
      return;
    }
    this.service.requestResetPassword(this.email).subscribe(() => {
        this.message = 'Email has been sent to ' + this.email + '. Check your inbox.';
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }
}
