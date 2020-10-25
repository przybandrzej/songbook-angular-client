import {Component, OnInit} from '@angular/core';
import {
  AuthorDTO,
  AuthorResourceService,
  AwaitingSongResourceService,
  CategoryDTO,
  CategoryResourceService,
  SongDTO,
  SongResourceService
} from '../../../songbook';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public approvedSongs: { song: SongDTO, author: Observable<AuthorDTO>, category: Observable<CategoryDTO> }[] = [];
  public awaitingSongs: { song: SongDTO, author: Observable<AuthorDTO> }[] = [];
  displayedColumnsAwaiting: string[] = ['author', 'title', 'added by', 'edits'];
  displayedColumnsApproved: string[] = ['author', 'title', 'average rating', 'category'];

  constructor(private songService: SongResourceService, private awaitingSongResourceService: AwaitingSongResourceService,
              public router: Router, private authorService: AuthorResourceService, private categoryService: CategoryResourceService) {
  }

  ngOnInit(): void {
    this.getAllSongs();
  }

  private getAllSongs() {
    this.songService.getAllSongsUsingGET(false).subscribe(next => {
      this.approvedSongs = next.map(song => {
        return {
          song,
          author: this.authorService.getAuthorByIdUsingGET(song.authorId),
          category: this.categoryService.getCategoryByIdUsingGET(song.categoryId)
        };
      });
    });
    this.awaitingSongResourceService.getAllAwaitingSongsUsingGET().subscribe(next => {
      this.awaitingSongs = next.map(song => {
        return {song, author: this.authorService.getAuthorByIdUsingGET(song.authorId)};
      });
    });
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
