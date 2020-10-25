import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserDetailsData} from '../../../model/user-details-data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public data: UserDetailsData;
  public tabs: string[] = ['Profile', 'Songs', 'Playlists', 'Added songs', 'Edited songs'];
  public openTab = UserProfileTabs.PROFILE;

  constructor(private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.data = this.route.snapshot.data.data;

  }

  close() {
    this.location.back();
  }

}

export enum UserProfileTabs {
  PROFILE, SONGS, PLAYLISTS, ADDED_SONGS, EDITED_SONGS
}
