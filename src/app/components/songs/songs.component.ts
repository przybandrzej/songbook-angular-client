import { Component, OnInit } from '@angular/core';
import {SongDTO, SongRestControllerService} from '../..';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public songs: SongDTO[] = [];

  public displayedColumns = ['author', 'title'];

  constructor(private songRestControllerService: SongRestControllerService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSongs();
  }

  private getAllSongs() {
    this.songRestControllerService.getAllUsingGET3().subscribe(next => {
      this.songs = next;
    });
  }

  openSongDetails(song: any) {

  }

  addSong() {

  }
}
