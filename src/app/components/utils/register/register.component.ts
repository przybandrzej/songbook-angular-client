import {Component, OnInit} from '@angular/core';
import {AuthenticationResourceService, RegisterNewUserForm} from '../../../songbook';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: RegisterNewUserForm = {email: '', password: '', username: ''};
  confirmPassword = '';
  isCreated = false;
  isError = false;
  errors: string[] = [];

  constructor(private authService: AuthenticationResourceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    this.errors = [];
    this.isError = false;
    if (this.confirmPassword !== this.form.password) {
      this.isError = true;
      this.errors.push('Passwords don\'t match');
      return;
    }
    this.authService.registerUsingPOST(this.form).subscribe(() => {
        this.isCreated = true;
      },
      error => {
        this.isError = true;
        this.errors = error.error.subErrors.map(it => it.message);
        if (error.error.message.includes('Username') || error.error.message.includes('Email')) {
          this.errors.unshift(error.error.message);
        }
      });
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }


}
