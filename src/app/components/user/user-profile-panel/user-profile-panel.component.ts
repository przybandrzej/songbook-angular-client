import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationResourceService, UserDTO} from '../../../songbook';

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
  @Output('resetPassword')
  resetPasswordEvent: EventEmitter<void> = new EventEmitter<void>();

  public resetActivated = false;
  public editableLastName = false;
  public editableFirstName = false;
  public firstNameToUpdate = '';
  public lastNameToUpdate = '';

  constructor(private authService: AuthenticationResourceService) {
  }

  ngOnInit(): void {
  }

  resetPassword() {
    this.resetPasswordEvent.emit();
    this.resetActivated = true;
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
}
