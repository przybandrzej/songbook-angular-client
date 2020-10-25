import {Component, Input, OnInit} from '@angular/core';
import {
  CreatePlaylistDTO,
  PlaylistDTO,
  PlaylistResourceService,
  SongDTO,
  SongResourceService,
  UserDTO,
  UserResourceService
} from '../../../songbook';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-playlist-panel',
  templateUrl: './user-playlist-panel.component.html',
  styleUrls: ['./user-playlist-panel.component.scss']
})
export class UserPlaylistPanelComponent implements OnInit {

  public playlists: PlaylistDTO[] = [];

  @Input()
  public user: UserDTO;

  public columns: string[] = ['name', 'status', 'created', 'songs', 'actions'];
  public selectedPlaylist: PlaylistDTO;
  public selectedPlaylistSongs: SongDTO[] = [];
  public songsColumns: string[] = ['author', 'title', 'category', 'actions'];

  constructor(private playlistService: PlaylistResourceService, private songService: SongResourceService, private router: Router,
              private userService: UserResourceService) {
  }

  ngOnInit(): void {
    this.userService.getPlaylistsByUserIdUsingGET(this.user.id).subscribe(res => this.playlists = res);
    this.initPlaylist();
  }

  private initPlaylist() {
    this.selectedPlaylist = {
      id: 0,
      isPrivate: true,
      name: '',
      ownerId: this.user.id
    };
    this.selectedPlaylistSongs = [];
  }

  createPlaylist() {
    const createPlaylist: CreatePlaylistDTO = {
      ownerId: this.user.id,
      songs: [],
      name: this.selectedPlaylist.name,
      isPrivate: this.selectedPlaylist.isPrivate
    };
    this.userService.addPlaylistUsingPATCH(this.user.id, createPlaylist).subscribe(
      () => {
        this.userService.getPlaylistsByUserIdUsingGET(this.user.id).subscribe(res => {
          this.playlists = res;
          this.refreshTable();
          this.deselect();
        });
      });
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.userService.removePlaylistUsingPATCH(this.user.id, id).subscribe(() => {
      const copy = this.playlists.slice();
      const item = copy.filter(it => it.id === id)[0];
      this.deselect();
      copy.splice(this.playlists.indexOf(item), 1);
      this.playlists = copy;
    });
  }

  deselect() {
    this.initPlaylist();
  }

  select(playlist: PlaylistDTO) {
    this.selectedPlaylist = playlist;
    this.selectedPlaylistSongs = [];
    this.getPlaylistSongs();
  }

  editPlaylist() {
    this.playlistService.updatePlaylistUsingPUT(this.selectedPlaylist).subscribe(playlist => {
      const old = this.playlists.filter(it => it.id === playlist.id)[0];
      const index = this.playlists.indexOf(old);
      this.playlists.splice(index, 1, playlist);
      this.refreshTable();
      this.select(playlist);
    });
  }

  privacyChanged(event: MatSlideToggleChange) {
    this.selectedPlaylist.isPrivate = !event.checked;
  }

  /**
   * This is necessary to refresh table data source
   */
  private refreshTable(): void {
    this.playlists = this.playlists.slice();
  }

  private getPlaylistSongs(): void {
    this.playlistService.getPlaylistSongsUsingGET(this.selectedPlaylist.id).subscribe(res => this.selectedPlaylistSongs = res);
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }

  removeSong(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.playlistService.removeSongFromPlaylistUsingPATCH(this.selectedPlaylist.id, id).subscribe(() => this.getPlaylistSongs());
  }

}
