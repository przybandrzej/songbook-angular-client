import {Component, Input, OnInit} from '@angular/core';
import {SongDTO} from '../../../songbook';
import {Router} from '@angular/router';

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

  public columns: string[] = ['author', 'title', 'average rating', 'category', 'approved'];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }
}
