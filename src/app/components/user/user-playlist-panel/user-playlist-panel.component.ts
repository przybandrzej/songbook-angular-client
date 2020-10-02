import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaylistDTO, PlaylistResourceService, SongDTO, SongResourceService, UserDTO} from '../../../songbook';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {forkJoin, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-playlist-panel',
  templateUrl: './user-playlist-panel.component.html',
  styleUrls: ['./user-playlist-panel.component.scss']
})
export class UserPlaylistPanelComponent implements OnInit {

  @Input()
  public playlists: PlaylistDTO[];

  @Input()
  public user: UserDTO;

  @Output()
  public playlistsChange: EventEmitter<PlaylistDTO[]> = new EventEmitter<PlaylistDTO[]>();

  public columns: string[] = ['name', 'status', 'created', 'songs', 'actions'];
  public selectedPlaylist: PlaylistDTO;
  public selectedPlaylistSongs: SongDTO[] = [];
  public songsColumns: string[] = ['author', 'title', 'category'];

  constructor(private playlistService: PlaylistResourceService, private songService: SongResourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.initPlaylist();
  }

  private initPlaylist() {
    this.selectedPlaylist = {
      id: 0,
      isPrivate: true,
      name: '',
      ownerId: this.user.id,
      songs: []
    };
    this.selectedPlaylistSongs = [];
  }

  createPlaylist() {
    this.playlistService.createUsingPOST2(this.selectedPlaylist).subscribe(
      playlist => {
        this.playlists.push(playlist);
        this.playlistsChange.emit(this.playlists);
        this.selectedPlaylist = playlist;
        this.refreshTable();
      });
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.playlistService.deleteUsingDELETE2(id).subscribe(() => {
      const copy = this.playlists.slice();
      const item = copy.filter(it => it.id === id)[0];
      if (this.selectedPlaylist.id === id) {
        this.initPlaylist();
      }
      copy.splice(this.playlists.indexOf(item), 1);
      this.playlists = copy;
      this.playlistsChange.emit(this.playlists);
    });
  }

  deselect() {
    this.initPlaylist();
  }

  select(playlist: PlaylistDTO) {
    this.selectedPlaylist = playlist;
    this.getPlaylistSongs();
  }

  editPlaylist() {
    this.playlistService.updateUsingPUT2(this.selectedPlaylist).subscribe(playlist => {
      const old = this.playlists.filter(it => it.id === playlist.id)[0];
      const index = this.playlists.indexOf(old);
      this.playlists.splice(index, 1, playlist);
      this.playlistsChange.emit(this.playlists);
      this.selectedPlaylist = playlist;
      this.refreshTable();
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
    const songs$: Observable<SongDTO>[] = [];
    this.selectedPlaylist.songs.forEach(it => songs$.push(this.songService.getByIdUsingGET4(it)));
    forkJoin(songs$).subscribe(res => this.selectedPlaylistSongs = res);
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }
}
