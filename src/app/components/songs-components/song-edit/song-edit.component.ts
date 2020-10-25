import {Component, OnInit} from '@angular/core';
import {
  AuthorDTO,
  AuthorResourceService,
  CategoryDTO,
  CategoryResourceService,
  CreateCoauthorDTO,
  SongCoauthorDTO,
  SongResourceService,
  TagDTO,
  UniversalCreateDTO
} from '../../../songbook';
import {ActivatedRoute, Router} from '@angular/router';
import {rolesForModerator} from '../../../model/user-roles-combinations';
import {FormControl, Validators} from '@angular/forms';
import {SongDetailsData} from '../../../model/song-details-data';
import {SongDetailsService} from '../../../services/song-details.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {

  public tagForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2)]);
  public titleForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2), Validators.required]);
  public authorForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2)]);
  public coauthorForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2)]);

  rolesForModerator = rolesForModerator;

  songData: SongDetailsData;

  coauthorFunctions = Object.values(SongCoauthorDTO.CoauthorFunctionEnum);

  authors: AuthorDTO[] = [];
  categories: CategoryDTO[] = [];

  coauthorToAdd: CreateCoauthorDTO = {
    authorName: '',
    coauthorFunction: null
  };
  authorToAdd: UniversalCreateDTO = {
    id: null,
    name: ''
  };
  tagToAdd: UniversalCreateDTO = {
    id: null,
    name: ''
  };

  errors: string[] = [];
  tagErrors: string[] = [];
  coauthorErrors: string[] = [];
  songErrors: string[] = [];

  constructor(private songService: SongResourceService, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryResourceService, private authorService: AuthorResourceService,
              private songDetailsService: SongDetailsService) {
  }

  public hasError(control: FormControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  ngOnInit(): void {
    this.songData = this.route.snapshot.data.data;
    this.authorService.getAllAuthorsUsingGET().subscribe(res => this.authors = res);
    this.categoryService.getAllCategoriesUsingGET().subscribe(res => this.categories = res);
  }

  cancel() {
    this.goToDetailScreen();
  }

  saveSong() {
    this.songErrors.forEach(it => this.errors.splice(this.errors.indexOf(it), 1));
    this.songErrors = [];
    this.songService.updateSongUsingPUT(this.songData.song).subscribe(song => {
        this.goToDetailScreen();
      },
      error => {
        if (error.error.subErrors) {
          this.songErrors = error.error.subErrors.map(it => '(' + it.parameter + ') ' + it.message);
          this.songErrors.forEach(it => this.errors.push(it));
        } else {
          this.songErrors = [error.error.message];
          this.songErrors.forEach(it => this.errors.push(it));
        }
      });
  }

  goToDetailScreen() {
    this.router.navigateByUrl('song/' + this.songData.song.id);
  }

  setCategory() {
    this.songService.setCategoryUsingPATCH(this.songData.song.categoryId, this.songData.song.id).subscribe(() => {
      this.songService.getSongCategoryUsingGET(this.songData.song.id).subscribe(category => this.songData.category = category);
    });
  }

  setAuthor() {
    this.songService.setAuthorUsingPATCH(this.songData.song.authorId, this.songData.song.id).subscribe(() => {
      this.authorToAdd.name = '';
      this.songService.getSongAuthorUsingGET(this.songData.song.id).subscribe(author => this.songData.author = author);
    });
  }

  setNewAuthor() {
    this.authorService.createAuthorUsingPOST(this.authorToAdd).subscribe(author => {
      this.authorToAdd.name = '';
      this.songService.setAuthorUsingPATCH(author.id, this.songData.song.id).subscribe(() => {
        this.songData.author = author;
        this.songData.song.authorId = author.id;
      });
    });
  }

  addCouathor() {
    this.coauthorErrors.forEach(it => this.errors.splice(this.errors.indexOf(it), 1));
    this.coauthorErrors = [];
    this.songService.addCoauthorToSongUsingPATCH(this.coauthorToAdd, this.songData.song.id).subscribe(() => {
        this.coauthorToAdd.coauthorFunction = null;
        this.coauthorToAdd.authorName = '';
        this.songDetailsService.getSongCoauthorsData(this.songData.song.id).subscribe(coauthors => {
          this.songData.coauthors = coauthors;
        });
      },
      error => {
        if (error.error.subErrors) {
          this.coauthorErrors = error.error.subErrors.map(it => '(' + it.parameter + ') ' + it.message);
          this.coauthorErrors.forEach(it => this.errors.push(it));
        } else {
          this.coauthorErrors = [error.error.message];
          this.coauthorErrors.forEach(it => this.errors.push(it));
        }
      });
  }

  removeCoauthor(coauthorDTO: SongCoauthorDTO) {
    this.songService.removeCoauthorFromSongUsingPATCH(coauthorDTO.id, this.songData.song.id)
      .subscribe(() => {
        this.songDetailsService.getSongCoauthorsData(this.songData.song.id).subscribe(res => this.songData.coauthors = res);
      });
  }

  removeTag(tag: TagDTO) {
    this.songService.removeTagFromSongUsingPATCH(this.songData.song.id, tag.id)
      .subscribe(() => this.songService.getSongTagsUsingGET(this.songData.song.id).subscribe(res => this.songData.tags = res));
  }

  approveSong() {
    this.songService.approveSongUsingPATCH(this.songData.song.id).subscribe(res => this.songData.song.isAwaiting = res.isAwaiting);
  }

  addTag(): void {
    this.tagErrors.forEach(it => this.errors.splice(this.errors.indexOf(it), 1));
    this.tagErrors = [];
    if (this.tagToAdd.name.length > 0) {
      this.songService.addTagToSongUsingPATCH(this.songData.song.id, this.tagToAdd).subscribe(
        () => {
          this.songService.getSongTagsUsingGET(this.songData.song.id).subscribe(res => this.songData.tags = res);
        },
        error => {
          if (error.error.subErrors) {
            this.tagErrors = error.error.subErrors.map(it => '(' + it.parameter + ') ' + it.message);
            this.tagErrors.forEach(it => this.errors.push(it));
          } else {
            this.tagErrors = [error.error.message];
            this.tagErrors.forEach(it => this.errors.push(it));
          }
        });
    }
    this.tagToAdd.name = '';
  }

}
