import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserDetailsData} from '../../../model/user-details-data';
import {AuthService} from '../../../services/auth.service';
import {UserData} from '../../../model/user-data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public data: UserDetailsData;
  public tabs: string[] = ['Profile', 'Songs', 'Playlists', 'Added songs', 'Edited songs'];
  public openTab = UserProfileTabs.PROFILE;
  public songData: UserData;

  constructor(private route: ActivatedRoute, private location: Location, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.data;
    this.songData = this.route.snapshot.data.songData;
  }

  close() {
    this.location.back();
  }

  resetPassword(): void {
    this.authService.requestResetPassword(this.data.user.email);
  }

}

export enum UserProfileTabs {
  PROFILE, SONGS, PLAYLISTS, ADDED_SONGS, EDITED_SONGS
}
