import {Component, OnInit} from '@angular/core';
import {AuthorDTO, AuthorResourceService, CategoryDTO, CategoryResourceService, SongCoauthorDTO, SongDTO, SongResourceService} from '../../songbook';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {

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
  coauthorsToAdd: SongCoauthorDTO[] = [];

  coauthorToAdd: SongCoauthorDTO = {
    authorId: -1,
    songId: -1,
    coauthorFunction: null
  };

  constructor(private songService: SongResourceService, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryResourceService, private authorService: AuthorResourceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.songService.getByIdUsingGET4(+params.get('id')).subscribe(res => {
          this.song = res;
          for (const coauthor of this.song.coauthors) {
            this.coauthorsToAdd.push(coauthor);
          }
        });
      }
    });
    this.authorService.getAllUsingGET().subscribe(res => this.authors = res);
    this.categoryService.getAllUsingGET2().subscribe(res => this.categories = res);
  }

  cancel() {
    this.goToDetailScreen();
  }

  saveSong() {
    for (const coauthor of this.coauthorsToAdd) {
      this.song.coauthors.push(coauthor);
    }
    this.song.coauthors = [...new Set(this.song.coauthors)];
    this.song.author.name = this.authors.filter((value, index, array) => value.id === this.song.author.id)[0].name;
    this.song.category.name = this.categories.filter((value, index, array) => value.id === this.song.category.id)[0].name;
    this.songService.updateUsingPUT4(this.song).subscribe(res => this.goToDetailScreen());
  }

  goToDetailScreen() {
    this.router.navigateByUrl('song/' + this.song.id);
  }

  addCouathor() {
    this.coauthorsToAdd.push({
      songId: this.song.id,
      authorId: this.coauthorToAdd.authorId,
      coauthorFunction: this.coauthorToAdd.coauthorFunction
    });
    this.coauthorToAdd.authorId = -1;
    this.coauthorToAdd.coauthorFunction = null;
  }

  removeCoauthor(coauthorDTO: SongCoauthorDTO) {
    const index = this.coauthorsToAdd.indexOf(coauthorDTO, 0);
    this.coauthorsToAdd.splice(index, 1);
  }

  getCoauthorName(authorId: number) {
    for (const author of this.authors.filter((value, index, array) => value.id === authorId)) {
      if (author !== null && author !== undefined) {
        return author.name;
      }
    }
  }
}
