import {Component, OnInit} from '@angular/core';
import {
  AuthorDTO,
  AuthorRestControllerService,
  CategoryDTO,
  CategoryRestControllerService,
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

  authors: AuthorDTO[];

  categories: CategoryDTO[];

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
    this.songRestControllerService.createUsingPOST4(this.song).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('song/' + res.id);
    });
  }
}
