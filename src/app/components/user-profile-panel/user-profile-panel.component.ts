import {Component, Input, OnInit} from '@angular/core';
import {UserDTO} from '../../songbook';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
