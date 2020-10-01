import {Component, OnInit} from '@angular/core';
import {AwaitingSongResourceService, SongDTO, SongResourceService, UserResourceService} from '../../../songbook';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public approvedSongs: SongDTO[] = [];
  public awaitingSongs: SongDTO[] = [];
  displayedColumnsAwaiting: string[] = ['author', 'title', 'added by', 'edits'];
  displayedColumnsApproved: string[] = ['author', 'title', 'average rating', 'category'];

  constructor(private songService: SongResourceService, private awaitingSongResourceService: AwaitingSongResourceService,
              private userResourceService: UserResourceService, public router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllSongs();
  }

  private getAllSongs() {
    this.songService.getAllUsingGET4().subscribe(next => this.approvedSongs = next);
    this.awaitingSongResourceService.getAllUsingGET1().subscribe(next => this.awaitingSongs = next);
  }

  openSongDetails(songId: number) {
    this.router.navigateByUrl('song/' + songId);
  }

  addSong() {
    this.router.navigateByUrl('add-song');
  }

  navToSong(id: number) {
    this.router.navigateByUrl('song/' + id);
  }
}
