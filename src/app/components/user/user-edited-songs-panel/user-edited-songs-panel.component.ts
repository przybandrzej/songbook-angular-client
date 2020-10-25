import {Component, Input, OnInit} from '@angular/core';
import {AuthorDTO, AuthorResourceService, CategoryDTO, CategoryResourceService, UserDTO, UserResourceService} from '../../../songbook';
import {Router} from '@angular/router';
import {SongDetailsService} from '../../../services/song-details.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserEditData} from '../../../model/user-details-data';

@Component({
  selector: 'app-user-edited-songs-panel',
  templateUrl: './user-edited-songs-panel.component.html',
  styleUrls: ['./user-edited-songs-panel.component.scss']
})
export class UserEditedSongsPanelComponent implements OnInit {

  public songs: { data: UserEditData, author: Observable<AuthorDTO>, category: Observable<CategoryDTO> }[] = [];

  @Input()
  public user: UserDTO;

  public columns: string[] = ['author', 'title', 'average rating', 'category', 'approved'];

  constructor(private router: Router, private userService: UserResourceService, private songDetailsService: SongDetailsService,
              private authorService: AuthorResourceService, private categoryService: CategoryResourceService) {
  }

  ngOnInit(): void {
    this.songDetailsService.getLoggedUserEditData().subscribe(res => {
      this.songs = res.map(it => {
        return {
          data: it,
          author: this.authorService.getAuthorByIdUsingGET(it.song.authorId),
          category: this.categoryService.getCategoryByIdUsingGET(it.song.categoryId)
        };
      });
    });
  }

  getAuthorName(id: number): Observable<string> {
    return this.authorService.getAuthorByIdUsingGET(id).pipe(map(it => it.name));
  }

  getCategoryName(id: number): Observable<string> {
    return this.categoryService.getCategoryByIdUsingGET(id).pipe(map(it => it.name));
  }

  openSongDetails(id: number) {
    this.router.navigateByUrl('song/' + id);
  }

}
