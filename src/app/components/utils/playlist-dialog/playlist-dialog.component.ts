import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlaylistDTO, SongDTO} from '../../../songbook';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss']
})
export class PlaylistDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PlaylistDialogData,
              public dialogRef: MatDialogRef<PlaylistDialogComponent, PlaylistDialogResult>) {
  }

  selected: PlaylistDTO[] = [];
  deselected: PlaylistDTO[] = [];
  newPlaylistName = '';

  ngOnInit(): void {
  }

  onSelect(event: MatCheckboxChange, playlist: PlaylistDTO) {
    if (event.checked) {
      this.selected.push(playlist);
    } else {
      this.selected.splice(this.selected.indexOf(playlist), 1);
      if (playlist.id > 0 && playlist.songs.filter(it => it === this.data.song.id).length > 0) {
        this.deselected.push(playlist);
      }
    }
  }

  isChecked(playlist: PlaylistDTO): boolean {
    return playlist.songs.filter(it => it === this.data.song.id).length > 0
      || this.selected.filter(it => it.id === playlist.id && it.name === playlist.name).length > 0;
  }

  addPlaylist() {
    const playlist: PlaylistDTO = {
      id: -1,
      isPrivate: true,
      name: this.newPlaylistName,
      songs: [],
      ownerId: -1
    };
    this.selected.push(playlist);
    this.newPlaylistName = '';
    this.data.playlists.push(playlist);
  }

  cancel() {
    this.dialogRef.close({selected: [], deselected: []});
  }

  apply() {
    this.dialogRef.close({selected: this.selected, deselected: this.deselected});
  }

}

export interface PlaylistDialogData {
  playlists: PlaylistDTO[];
  song: SongDTO;
}

export interface PlaylistDialogResult {
  selected: PlaylistDTO[];
  deselected: PlaylistDTO[];
}
