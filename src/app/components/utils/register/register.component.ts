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

  constructor(private authService: AuthenticationResourceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    this.authService.registerUsingPOST(this.form).subscribe(next => this.isCreated = true);
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
}
