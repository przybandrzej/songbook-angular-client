import {Component, Input, OnInit} from '@angular/core';
import {UserDTO} from '../../../songbook';
import {Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {SongDetailsService} from '../../../services/song-details.service';

@Component({
  selector: 'app-user-added-songs-panel',
  templateUrl: './user-added-songs-panel.component.html',
  styleUrls: ['./user-added-songs-panel.component.scss']
})
export class UserAddedSongsPanelComponent implements OnInit {

  public songs: SongDetailsData[] = [];

  @Input()
  public user: UserDTO;

  public columns: string[] = ['author', 'title', 'average rating', 'category', 'approved'];

  constructor(private router: Router, private songDetailsService: SongDetailsService) {
  }

  ngOnInit(): void {
    this.songDetailsService.getLoggedUserSongsData().subscribe(res => this.songs = res);
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }
}
