import {Component, OnInit} from '@angular/core';
import {SongDTO, SongResourceService} from '../..';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public songs: SongDTO[] = [];

  songFormControl: FormControl;

  displayedColumns: string[] = ['author', 'title', 'average rating'];

  filteredSongs: any;

  constructor(private songService: SongResourceService, public router: Router, private dialog: MatDialog) {
    this.songFormControl = new FormControl();
  }

  ngOnInit(): void {
    this.getAllSongs();

    this.songFormControl.valueChanges.pipe(
      startWith(null as string),
      map(value => this.filterSongs(value)))
      .subscribe(songsFiltered => {
        this.filteredSongs = songsFiltered;
      });
  }

  private getAllSongs() {
    this.songService.getAllUsingGET4().subscribe(next => {
      this.songs = next;
    });
  }

  openSongDetails(songId: number) {
    this.router.navigateByUrl('song/' + songId);
  }

  addSong() {
    this.router.navigateByUrl('add-song');
  }

  filterSongs(val: string): SongDTO[] {
    let filtered: Array<SongDTO> = [];
    filtered = filtered.concat(this.songs.filter(song => song.title.toLocaleLowerCase().includes(val, 0)));
    filtered = filtered.concat(this.songs.filter(song => song.author.name.toLocaleLowerCase().includes(val, 0)));
    filtered = filtered.concat(this.songs.filter(song => song.category.name.toLocaleLowerCase().includes(val, 0)));
    filtered = filtered.concat(this.songs.filter(song => {
      for (const tag of song.tags) {
        if (tag.name.toLocaleLowerCase().includes(val, 0)) {
          return true;
        }
      }
      return false;
    }));
    filtered = filtered.concat(this.songs.filter(song => song.lyrics.toLocaleLowerCase().includes(val, 0)));
    filtered = filtered.concat(this.songs.filter(song => song.trivia.toLocaleLowerCase().includes(val, 0)));
    filtered = [...new Set(filtered)];
    return filtered;
  }

  navToSong(id: number) {
    this.router.navigateByUrl('song/' + id);
  }
}
