import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlaylistDTO, SongDTO} from '../../../songbook';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {PlaylistData} from '../../../model/playlist-data';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss']
})
export class PlaylistDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PlaylistDialogData,
              public dialogRef: MatDialogRef<PlaylistDialogComponent, PlaylistDialogResult>) {
  }

  selected: PlaylistData[] = [];
  deselected: PlaylistData[] = [];
  newPlaylistName = '';

  ngOnInit(): void {
  }

  onSelect(event: MatCheckboxChange, playlist: PlaylistData) {
    if (event.checked) {
      this.selected.push(playlist);
      if (this.deselected.filter(it => it.playlist.id === playlist.playlist.id).length > 0) {
        this.deselected.splice(this.deselected.indexOf(playlist), 1);
        playlist.songs.splice(playlist.songs.indexOf(playlist.songs.filter(it => it.id === this.data.song.id)[0]), 1);
      }
    } else {
      this.selected.splice(this.selected.indexOf(playlist), 1);
      if (playlist.playlist.id > 0 && playlist.songs.filter(it => it.id === this.data.song.id)) {
        this.deselected.push(playlist);
      }
    }
  }

  isChecked(playlist: PlaylistData): boolean {
    return playlist.songs.filter(it => it.id === this.data.song.id).length > 0
      || this.selected.filter(it => it.playlist.id === playlist.playlist.id && it.playlist.name === playlist.playlist.name).length > 0;
  }

  addPlaylist() {
    const playlist: PlaylistData = {
      playlist: {
        id: -1,
        isPrivate: true,
        name: this.newPlaylistName,
        ownerId: -1
      },
      songs: [this.data.song]
    };
    this.selected.push(playlist);
    this.newPlaylistName = '';
    this.data.playlists.push(playlist);
  }

  cancel() {
    this.dialogRef.close({selected: [], deselected: []});
  }

  apply() {
    this.dialogRef.close({selected: this.selected.map(it => it.playlist), deselected: this.deselected.map(it => it.playlist)});
  }

}

export interface PlaylistDialogData {
  playlists: PlaylistData[];
  song: SongDTO;
}

export interface PlaylistDialogResult {
  selected: PlaylistDTO[];
  deselected: PlaylistDTO[];
}
