import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationResourceService, UserDTO, UserResourceService} from '../../../songbook';
import {Router} from '@angular/router';
import {SongDetailsData} from '../../../model/song-details-data';
import {SongDetailsService} from '../../../services/song-details.service';

@Component({
  selector: 'app-user-songs-panel',
  templateUrl: './user-songs-panel.component.html',
  styleUrls: ['./user-songs-panel.component.scss']
})
export class UserSongsPanelComponent implements OnInit {

  @Input()
  public user: UserDTO;

  public songs: SongDetailsData[] = [];

  public columns: string[] = ['author', 'title', 'average rating', 'category', 'actions'];

  constructor(private router: Router, private authService: AuthenticationResourceService, private songDetailsService: SongDetailsService,
              private userService: UserResourceService) {
  }

  ngOnInit(): void {
    this.songDetailsService.getLoggedUserSongsData().subscribe(data => this.songs = data);
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.userService.removeSongFromLibraryUsingPATCH(this.user.id, id).subscribe(() => {
      const copy = this.songs.slice();
      const item = copy.filter(it => it.song.id === id)[0];
      copy.splice(this.songs.indexOf(item), 1);
      this.songs = copy;
    });
  }
}
