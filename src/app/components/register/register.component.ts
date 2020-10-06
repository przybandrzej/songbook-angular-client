import {Component, OnInit} from '@angular/core';
import {AuthenticationResourceService, RegisterNewUserForm} from '../../songbook';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public usernameForm: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 _-żźćńółęąśŻŹĆĄŚĘŁÓŃ]{4,15}$')]);
  public emailForm: FormControl = new FormControl('', [Validators.email, Validators.required]);
  public firstNameForm: FormControl = new FormControl('', [Validators.pattern('^[a-z A-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')]);
  public lastNameForm: FormControl = new FormControl('', [Validators.pattern('^[a-z A-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')]);
  public passwordForm: FormControl = new FormControl('', [Validators.required, Validators.pattern('^(.){6,128}$')]);
  public confirmPasswordForm: FormControl = new FormControl('', [Validators.required]);

  form: RegisterNewUserForm = {email: '', password: '', username: ''};
  confirmPassword = '';
  isCreated = false;
  isError = false;
  errors: string[] = [];
  errorMessage = '';
  successMessage: string;

  constructor(private authService: AuthenticationResourceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    this.errors = [];
    this.isError = false;
    this.validateConfirmPassword();
    if (this.isError) {
      return;
    }
    this.authService.registerUsingPOST(this.form).subscribe(() => {
        this.successMessage = 'Success ' + this.form.username + '! Your account has been created! Check your email for activation link.';
        this.isCreated = true;
      },
      error => {
        if (error.error.message.includes('Validation failed')) {
          this.errors = error.error.subErrors.map(it => it.message);
        } else {
          this.isError = true;
          if (error.error.message.includes('Username')) {
            this.errorMessage = 'Username is already used.';
          } else if (error.error.message.includes('Email')) {
            this.errorMessage = 'Email is already used.';
          } else {
            this.errorMessage = error.error.message;
          }
        }
      });
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

  validateConfirmPassword() {
    this.isError = false;
    if (this.confirmPassword !== this.form.password) {
      this.isError = true;
      this.errorMessage = 'Passwords don\'t match!';
    }
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }
}
