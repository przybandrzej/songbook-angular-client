import {Component, OnInit} from '@angular/core';
import {
  AuthorDTO,
  AuthorRestControllerService,
  CategoryDTO,
  CategoryRestControllerService,
  CreateCoauthorDTO,
  CreateSongDTO,
  SongRestControllerService
} from '../..';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.scss']
})
export class SongAddComponent implements OnInit {

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

  coauthorFunctions = ['muzyka', 'tekst'];

  authors: AuthorDTO[] = [];
  categories: CategoryDTO[] = [];
  coauthorsToAdd: CreateCoauthorDTO[] = [];
  tagsToAdd: string[] = [];

  coauthorToAdd: CreateCoauthorDTO = {
    authorName: '',
    coauthorFunction: ''
  };
  tagToAdd = '';

  constructor(private songRestControllerService: SongRestControllerService, private route: ActivatedRoute, private router: Router, snackBar: MatSnackBar,
              private authorRestControllerService: AuthorRestControllerService, private categoryRestControllerService: CategoryRestControllerService) {
  }

  ngOnInit(): void {
    this.authorRestControllerService.getAllUsingGET().subscribe(res => this.authors = res);
    this.categoryRestControllerService.getAllUsingGET1().subscribe(res => this.categories = res);
  }

  cancel() {
    this.router.navigateByUrl('songs');
  }

  saveSong() {
    for (const coauthor of this.coauthorsToAdd) {
      this.song.coauthors.push(coauthor);
    }
    for (const tag of this.tagsToAdd) {
      this.song.tags.push(tag);
    }
    this.songRestControllerService.createUsingPOST4(this.song).subscribe(res => {
      this.router.navigateByUrl('song/' + res.id);
    });
  }

  addCouathor() {
    this.coauthorsToAdd.push({authorName: this.coauthorToAdd.authorName, coauthorFunction: this.coauthorToAdd.coauthorFunction});
    this.coauthorToAdd.authorName = '';
    this.coauthorToAdd.coauthorFunction = '';
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
}
