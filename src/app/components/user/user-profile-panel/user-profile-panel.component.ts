import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationResourceService, UserDTO} from '../../../songbook';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile-panel',
  templateUrl: './user-profile-panel.component.html',
  styleUrls: ['./user-profile-panel.component.scss']
})
export class UserProfilePanelComponent implements OnInit {

  @Input()
  user: UserDTO;
  @Output()
  public userChange: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();
  @Input()
  roleName: string;

  public resetActivated = false;
  public editableLastName = false;
  public editableFirstName = false;
  public firstNameToUpdate = '';
  public lastNameToUpdate = '';
  public editableEmail = false;
  public emailToUpdate = '';

  public errorMessages: string[] = [];
  public successMessage = '';

  constructor(private authService: AuthenticationResourceService, private loginService: AuthService) {
  }

  ngOnInit(): void {
  }

  resetPassword() {
    this.loginService.requestResetPassword(this.user.email).subscribe(() => {
      this.successMessage = 'Password reset email has been sent.';
    });
  }

  editFirstName() {
    this.editableFirstName = true;
    this.firstNameToUpdate = '';
  }

  editLastName() {
    this.editableLastName = true;
    this.lastNameToUpdate = '';
  }

  updateFirstName() {
    this.user.firstName = this.firstNameToUpdate;
    this.editableFirstName = false;
    this.authService.saveAccountUsingPOST(this.user).subscribe(user => {
      this.user = user;
      this.userChange.emit(this.user);
    });
  }

  updateLastName() {
    this.user.lastName = this.lastNameToUpdate;
    this.editableLastName = false;
    this.authService.saveAccountUsingPOST(this.user).subscribe(user => {
      this.user = user;
      this.userChange.emit(this.user);
    });
  }

  editEmail() {
    this.editableEmail = true;
    this.emailToUpdate = '';
  }

  updateEmailName() {
    this.editableEmail = false;
    this.authService.changeEmailUsingPATCH({email: this.emailToUpdate}).subscribe(() => {
        this.user.email = this.emailToUpdate;
        this.userChange.emit(this.user);
      },
      error => {
      if(error.error.subErrors) {
        this.errorMessages = error.error.subErrors.map(it => it.message);
      } else {
        this.errorMessages = [error.error.message];
      }
      });
  }
}
