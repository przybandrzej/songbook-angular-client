import {Component, OnInit} from '@angular/core';
import {
  AuthorDTO,
  AuthorResourceService,
  CategoryDTO,
  CategoryResourceService,
  SongCoauthorDTO,
  SongCoauthorResourceService,
  SongDTO,
  SongResourceService,
  TagDTO,
  TagResourceService,
  UniversalCreateDTO
} from '../../../songbook';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {rolesForModerator} from '../../../model/user-roles-combinations';
import {FormControl, Validators} from '@angular/forms';

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

  song: SongDTO = {
    author: {
      id: -1,
      name: ''
    },
    averageRating: 0,
    category: {
      id: -1,
      name: ''
    },
    coauthors: [],
    edits: [],
    addedBy: null,
    guitarTabs: '',
    id: -1,
    lyrics: '',
    tags: [],
    title: '',
    trivia: ''
  };

  coauthorFunctions = Object.values(SongCoauthorDTO.CoauthorFunctionEnum);

  authors: AuthorDTO[] = [];
  categories: CategoryDTO[] = [];

  coauthorToAdd: SongCoauthorDTO = {
    authorId: -1,
    songId: -1,
    coauthorFunction: null
  };
  coauthorToAddName = '';
  authorToAdd: UniversalCreateDTO = {
    id: null,
    name: ''
  };
  tagToAdd: UniversalCreateDTO = {
    id: null,
    name: ''
  };

  constructor(private songService: SongResourceService, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryResourceService, private authorService: AuthorResourceService,
              private coauthorService: SongCoauthorResourceService, private tagService: TagResourceService) {
  }

  public hasError(control: FormControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.songService.getByIdUsingGET4(+params.get('id')).subscribe(res => this.song = res);
      }
    });
    this.authorService.getAllUsingGET().subscribe(res => this.authors = res);
    this.categoryService.getAllUsingGET2().subscribe(res => this.categories = res);
  }

  cancel() {
    this.goToDetailScreen();
  }

  saveSong() {
    if (this.song.author.id) {
      this.song.author = this.authors.filter(it => it.id === this.song.author.id)[0];
    }

    let createAuthorRequest: Observable<AuthorDTO>;
    if (this.authorToAdd.name.length > 0) {
      createAuthorRequest = this.authorService.createUsingPOST(this.authorToAdd);
    }
    this.song.category.name = this.categories.filter(
      (value, index, array) => value.id === this.song.category.id)[0].name;

    if (createAuthorRequest) {
      createAuthorRequest.subscribe(author => {
        this.song.author = author;
        this.songService.updateUsingPUT4(this.song).subscribe(song => {
          this.goToDetailScreen();
        });
      });
    } else {
      this.songService.updateUsingPUT4(this.song).subscribe(song => {
        this.goToDetailScreen();
      });
    }
  }

  goToDetailScreen() {
    this.router.navigateByUrl('song/' + this.song.id);
  }

  addCouathor() {
    if (this.coauthorToAdd.authorId === -1) {
      this.coauthorToAdd.songId = this.song.id;
      this.authorService.createUsingPOST({id: null, name: this.coauthorToAddName}).subscribe(author => {
        this.coauthorToAdd.authorId = author.id;
        this.authors.push(author);
        this.coauthorService.createUsingPOST3(this.coauthorToAdd).subscribe(coauthor => {
          this.song.coauthors.push(coauthor);
          this.coauthorToAdd.authorId = -1;
          this.coauthorToAdd.coauthorFunction = null;
          this.coauthorToAddName = '';
        });
      });
    } else {
      this.coauthorToAdd.songId = this.song.id;
      this.coauthorService.createUsingPOST3(this.coauthorToAdd).subscribe(coauthor => {
        this.song.coauthors.push(coauthor);
        this.coauthorToAdd.authorId = -1;
        this.coauthorToAdd.coauthorFunction = null;
        this.coauthorToAddName = '';
      });
    }
  }

  removeCoauthor(coauthorDTO: SongCoauthorDTO) {
    this.coauthorService.deleteUsingDELETE3(coauthorDTO.authorId, coauthorDTO.coauthorFunction, coauthorDTO.songId)
      .subscribe(() => {
        this.song.coauthors.splice(this.song.coauthors.indexOf(coauthorDTO), 1);
      });
  }

  getCoauthorName(coauthor: SongCoauthorDTO) {
    return this.authors.filter(it => it.id === coauthor.authorId)[0].name;
  }

  removeTag(tag: TagDTO) {
    this.song.tags.splice(this.song.tags.indexOf(tag), 1);
    this.songService.updateUsingPUT4(this.song).subscribe(song => this.song = song);
  }

  approveSong() {
    this.songService.approveSongUsingPUT(this.song).subscribe(res => this.song = res);
  }

  addTag(): void {
    if (this.tagToAdd.name.length > 0) {
      this.tagService.createUsingPOST5(this.tagToAdd).subscribe(tag => {
        this.song.tags.push(tag);
        this.songService.updateUsingPUT4(this.song).subscribe(song => {
          this.song = song;
        });
      });
    }
    this.tagToAdd.name = '';
  }

}
