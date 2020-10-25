import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationResourceService, UserDTO, UserResourceService} from '../../../songbook';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {
  UserAvatarDialogResult,
  UserAvatarDialogResultEnum,
  UserAvatarUpdateDialogComponent
} from '../user-avatar-update-dialog/user-avatar-update-dialog.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  public userSongsCount: Observable<number>;

  public errorMessages: string[] = [];
  public successMessage = '';

  constructor(private authService: AuthenticationResourceService, private loginService: AuthService, public dialog: MatDialog,
              private userService: UserResourceService) {
  }

  ngOnInit(): void {
    this.userSongsCount = this.userService.getSongsByUserIdUsingGET(this.user.id).pipe(map(songs => songs.length));
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
    this.editableFirstName = false;
    this.authService.changeFirstNameUsingPATCH({name: this.firstNameToUpdate}).subscribe(() => {
      this.user.firstName = this.firstNameToUpdate;
      this.userChange.emit(this.user);
    });
  }

  updateLastName() {
    this.editableLastName = false;
    this.authService.changeLastNameUsingPATCH({name: this.lastNameToUpdate}).subscribe(() => {
      this.user.lastName = this.lastNameToUpdate;
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
        if (error.error.subErrors) {
          this.errorMessages = error.error.subErrors.map(it => it.message);
        } else {
          this.errorMessages = [error.error.message];
        }
      });
  }

  changeUserAvatar() {
    const dialogRef = this.dialog.open<UserAvatarUpdateDialogComponent, UserDTO, UserAvatarDialogResult>(UserAvatarUpdateDialogComponent, {
      data: this.user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.action === UserAvatarDialogResultEnum.APPLY) {
        this.authService.changeImageUrlUsingPATCH(result.newUrl).subscribe(() => {
          this.user.imageUrl = result.newUrl;
          this.userChange.emit(this.user);
        });
      }
    });
  }

}
