import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationResourceService, SongDTO, UserDTO} from '../../../songbook';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-songs-panel',
  templateUrl: './user-songs-panel.component.html',
  styleUrls: ['./user-songs-panel.component.scss']
})
export class UserSongsPanelComponent implements OnInit {

  @Input()
  public songs: SongDTO[];
  @Output()
  public songsChange: EventEmitter<SongDTO[]> = new EventEmitter<SongDTO[]>();

  @Input()
  public user: UserDTO;

  public columns: string[] = ['author', 'title', 'average rating', 'category', 'actions'];

  constructor(private router: Router, private authService: AuthenticationResourceService) {
  }

  ngOnInit(): void {
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    const userItem = this.user.songs.filter(it => it === id)[0];
    this.user.songs.splice(this.user.songs.indexOf(userItem), 1);
    this.authService.saveAccountUsingPOST(this.user).subscribe(user => {
      const copy = this.songs.slice();
      const item = copy.filter(it => it.id === id)[0];
      copy.splice(this.songs.indexOf(item), 1);
      this.songs = copy;
      this.songsChange.emit(this.songs);
    });
  }
}
