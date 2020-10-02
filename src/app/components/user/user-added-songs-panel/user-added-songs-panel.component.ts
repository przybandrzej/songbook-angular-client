import {Component, Input, OnInit} from '@angular/core';
import {SongDTO} from '../../../songbook';

@Component({
  selector: 'app-user-added-songs-panel',
  templateUrl: './user-added-songs-panel.component.html',
  styleUrls: ['./user-added-songs-panel.component.scss']
})
export class UserAddedSongsPanelComponent implements OnInit {

  @Input()
  public songs: SongDTO[];

  @Input()
  public username: string;

  public columns: string[] = ['author', 'title', 'average rating', 'category'];

  constructor() {
  }

  ngOnInit(): void {
  }

  openSongDetails(id: number) {

  }
}
