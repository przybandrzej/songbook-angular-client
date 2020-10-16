import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public passwordForm: FormControl = new FormControl('', [Validators.required, Validators.pattern('^(.){6,128}$')]);
  public confirmPasswordForm: FormControl = new FormControl('', [Validators.required]);

  form: { newPass?: string, confirmPass?: string, token?: string } = {};
  message = '';
  errorMessage = '';
  isError = false;
  isNoTokenError = false;
  noTokenErrorMessage = 'No token provided.';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.validateConfirmPassword();
    if (this.isError) {
      return;
    }
    this.form.token = this.route.snapshot.queryParamMap.get('key');
    this.isNoTokenError = !this.form.token;
  }

  reset() {
    this.isError = false;
    if (this.form.newPass !== this.form.confirmPass) {
      this.isError = true;
      this.errorMessage = 'Passwords don\'t match.';
      return;
    }
    this.authService.completePasswordReset({newPassword: this.form.newPass, token: this.form.token})
      .subscribe(() => {
          this.message = 'Reset complete!';
        },
        error => {
          this.isError = true;
          this.errorMessage = error.error.message;
        });
  }

  validateConfirmPassword() {
    this.isError = false;
    if (this.form.newPass !== this.form.confirmPass) {
      this.isError = true;
      this.errorMessage = 'Passwords don\'t match!';
    }
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }
}
