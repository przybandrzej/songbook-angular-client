import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDTO} from '../../../songbook';

@Component({
  selector: 'app-user-profile-panel',
  templateUrl: './user-profile-panel.component.html',
  styleUrls: ['./user-profile-panel.component.scss']
})
export class UserProfilePanelComponent implements OnInit {

  @Input()
  user: UserDTO;
  @Input()
  roleName: string;
  @Output('resetPassword')
  resetPasswordEvent: EventEmitter<void> = new EventEmitter<void>();

  public resetActivated = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  resetPassword() {
    this.resetPasswordEvent.emit();
    this.resetActivated = true;
  }
}
