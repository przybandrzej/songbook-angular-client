import {Component, Input, OnInit} from '@angular/core';
import {PlaylistDTO} from '../../../songbook';

@Component({
  selector: 'app-user-playlist-panel',
  templateUrl: './user-playlist-panel.component.html',
  styleUrls: ['./user-playlist-panel.component.scss']
})
export class UserPlaylistPanelComponent implements OnInit {

  @Input()
  public playlists: PlaylistDTO[];

  @Input()
  public username: string;

  constructor() { }

  ngOnInit(): void {
  }

}
