import {Component, OnInit} from '@angular/core';
import {
  AuthorDTO,
  AuthorResourceService,
  CategoryDTO,
  CategoryResourceService,
  CreateCoauthorDTO,
  CreateSongDTO,
  SongCoauthorDTO,
  SongResourceService
} from '../../../songbook';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {SongDetailsSource} from '../song-details/song-details.component';
import {MatDialog} from '@angular/material/dialog';
import {
  SongInstructionsDialogComponent,
  SongInstructionsType
} from '../../utils/song-instructions-dialog/song-instructions-dialog.component';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.scss']
})
export class SongAddComponent implements OnInit {

  public tagForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2)]);
  public titleForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2), Validators.required]);
  public authorForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2)]);
  public coauthorForm: FormControl = new FormControl('', [Validators.maxLength(40), Validators.minLength(2)]);

  song: CreateSongDTO = {
    authorName: '',
    categoryId: 0,
    coauthors: [],
    guitarTabs: '',
    lyrics: '',
    tags: [],
    title: '',
    trivia: ''
  };

  coauthorFunctions = Object.values(SongCoauthorDTO.CoauthorFunctionEnum);

  authors: AuthorDTO[] = [];
  categories: CategoryDTO[] = [];
  coauthorsToAdd: CreateCoauthorDTO[] = [];
  tagsToAdd: string[] = [];

  coauthorToAdd: CreateCoauthorDTO = {
    authorName: '',
    coauthorFunction: null
  };
  tagToAdd = '';

  isError = false;
  errors: string[] = [];

  constructor(private songService: SongResourceService, private route: ActivatedRoute, private router: Router, snackBar: MatSnackBar,
              private authorService: AuthorResourceService, private categoryService: CategoryResourceService, public dialog: MatDialog) {
  }

  public hasError(form: FormControl, errorName: string): boolean {
    return form.hasError(errorName);
  }

  ngOnInit(): void {
    this.authorService.getAllUsingGET().subscribe(res => this.authors = res);
    this.categoryService.getAllUsingGET2().subscribe(res => this.categories = res);
  }

  cancel() {
    this.router.navigateByUrl('songs');
  }

  saveSong() {
    this.isError = false;
    this.errors = [];
    for (const coauthor of this.coauthorsToAdd) {
      this.song.coauthors.push(coauthor);
    }
    for (const tag of this.tagsToAdd) {
      this.song.tags.push(tag);
    }
    this.songService.createUsingPOST4(this.song).subscribe(res => {
        this.router.navigateByUrl('song/' + res.id + '?source=' + SongDetailsSource.ADD);
      },
      error => {
        this.isError = true;
        this.errors = error.error.subErrors.map(it => '(' + it.parameter + ') ' + it.message);
      });
  }

  addCouathor() {
    this.coauthorsToAdd.push({authorName: this.coauthorToAdd.authorName, coauthorFunction: this.coauthorToAdd.coauthorFunction});
    this.coauthorToAdd.authorName = '';
    this.coauthorToAdd.coauthorFunction = null;
  }

  removeCoauthor(coauthorDTO: CreateCoauthorDTO) {
    const index = this.coauthorsToAdd.indexOf(coauthorDTO, 0);
    this.coauthorsToAdd.splice(index, 1);
  }

  addTag() {
    this.tagsToAdd.push(this.tagToAdd);
    this.tagToAdd = '';
  }

  removeTag(tagName: string) {
    const index = this.tagsToAdd.indexOf(tagName, 0);
    this.tagsToAdd.splice(index, 1);
  }

  openInstructions() {
    const dialogRef = this.dialog.open<SongInstructionsDialogComponent, SongInstructionsType, void>(SongInstructionsDialogComponent, {
      data: SongInstructionsType.ADD
    });
    dialogRef.afterClosed().subscribe(() => {
      return;
    });
  }
}
