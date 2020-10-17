import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserDTO} from '../../../songbook';

@Component({
  selector: 'app-user-avatar-update-dialog',
  templateUrl: './user-avatar-update-dialog.component.html',
  styleUrls: ['./user-avatar-update-dialog.component.scss']
})
export class UserAvatarUpdateDialogComponent implements OnInit {

  public fileUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserDTO,
              public dialogRef: MatDialogRef<UserAvatarUpdateDialogComponent, UserAvatarDialogResult>) {
  }

  ngOnInit(): void {
    this.fileUrl = this.data.imageUrl;
  }

  cancel() {
    this.dialogRef.close({action: UserAvatarDialogResultEnum.CANCEL, newUrl: undefined});
  }

  apply() {
    this.dialogRef.close({action: UserAvatarDialogResultEnum.APPLY, newUrl: this.fileUrl});
  }

}

export interface UserAvatarDialogResult {
  action: UserAvatarDialogResultEnum;
  newUrl: string;
}

export enum UserAvatarDialogResultEnum {
  CANCEL, APPLY
}
