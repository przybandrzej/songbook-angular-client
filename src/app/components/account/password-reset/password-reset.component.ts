import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  form: { newPass?: string, confirmPass?: string, token?: string } = {};
  message = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form.token = this.route.snapshot.queryParamMap.get('key');
  }

  reset() {
    if (this.form.newPass && this.form.confirmPass && this.form.token) {
      if (this.form.newPass === this.form.confirmPass) {
        this.authService.completePasswordReset({newPassword: this.form.newPass, token: this.form.token});
        this.message = 'Reset complete!';
      } else {
        this.message = 'Passwords don\'t match.';
      }
    } else {
      this.message = 'Token or passwords are not present.';
    }
  }
}
