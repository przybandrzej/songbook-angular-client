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
  TagDTO
} from '../../../songbook';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {rolesForModerator} from '../../../model/user-roles-combinations';
import CoauthorFunctionEnum = SongCoauthorDTO.CoauthorFunctionEnum;

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {

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
  coauthorsToAdd: SongCoauthorDTO[] = [];

  coauthorToAdd: SongCoauthorDTO = {
    authorId: -1,
    songId: -1,
    coauthorFunction: null
  };

  coauthorsToCreate: {
    name: string,
    coauthorFunction: CoauthorFunctionEnum
  }[] = [];

  authorToAdd = '';
  coauthorToAddName = '';
  // coauthorsToDelete: SongCoauthorDTO[] = [];
  allCoauthors: { coauthor: SongCoauthorDTO, name: string }[] = [];

  constructor(private songService: SongResourceService, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryResourceService, private authorService: AuthorResourceService,
              private coauthorService: SongCoauthorResourceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.songService.getByIdUsingGET4(+params.get('id')).subscribe(res => {
          this.song = res;
          console.log('Song is awaiting ' + this.song.isAwaiting);
          for (const coauthor of this.song.coauthors) {
            this.coauthorsToAdd.push(coauthor);
          }
        });
      }
    });
    this.authorService.getAllUsingGET().subscribe(res => {
      this.authors = res;
      this.coauthorsToAdd.forEach(it => this.allCoauthors.push({coauthor: it, name: this.getCoauthorName(it)}));
    });
    this.categoryService.getAllUsingGET2().subscribe(res => this.categories = res);
  }

  cancel() {
    this.goToDetailScreen();
  }

  saveSong() {
    const diffs = this.song.coauthors.filter(it => this.coauthorsToAdd.filter(songIt => songIt.authorId === it.authorId).length === 0);

    const deleteCoauthorsRequest: Observable<any>[] = [];
    diffs.forEach(it => deleteCoauthorsRequest.push(this.coauthorService.deleteUsingDELETE3(it.authorId, it.coauthorFunction, it.songId)));

    const authorCreateRequests: Observable<AuthorDTO>[] = [];
    this.coauthorsToCreate = [...new Set(this.coauthorsToCreate)];
    if (this.coauthorsToCreate.length > 0) {
      this.coauthorsToCreate.forEach(it => authorCreateRequests.push(this.authorService.createUsingPOST({id: null, name: it.name})));
    }

    if (this.song.author.id) {
      this.song.author = this.authors.filter(it => it.id === this.song.author.id)[0];
    }
    const newCoauthors = this.coauthorsToAdd.filter(it => this.song.coauthors.filter(songIt => songIt.authorId === it.authorId).length === 0);

    let coauthorsRequests: Observable<any>;
    if (authorCreateRequests.length > 0) {
      coauthorsRequests = forkJoin(authorCreateRequests).pipe(
        mergeMap(authors => {
          const coauthorsCreateRequests: Observable<SongCoauthorDTO>[] = [];
          authors.forEach(author => {
            const found = this.coauthorsToCreate.filter(it => it.name === author.name)[0];
            coauthorsCreateRequests.push(this.coauthorService.createUsingPOST3({
              authorId: author.id,
              songId: this.song.id,
              coauthorFunction: found.coauthorFunction
            }));
          });
          newCoauthors.forEach(it => coauthorsCreateRequests.push(this.coauthorService.createUsingPOST3(it)));
          const requests: Observable<any>[] = coauthorsCreateRequests.slice();
          deleteCoauthorsRequest.forEach(it => requests.push(it));
          if (requests.length > 0) {
            return forkJoin(requests);
          } else {
            return of([]);
          }
        }));
    } else if (deleteCoauthorsRequest.length > 0) {
      newCoauthors.forEach(it => deleteCoauthorsRequest.push(this.coauthorService.createUsingPOST3(it)));
      coauthorsRequests = forkJoin(deleteCoauthorsRequest);
    } else if (newCoauthors.length > 0) {
      const req = [];
      newCoauthors.forEach(it => req.push(this.coauthorService.createUsingPOST3(it)));
      coauthorsRequests = forkJoin(req);
    }

    let createAuthorRequest: Observable<AuthorDTO>;
    if (this.authorToAdd.length > 0) {
      createAuthorRequest = this.authorService.createUsingPOST({id: null, name: this.authorToAdd});
    }
    this.song.category.name = this.categories.filter((value, index, array) => value.id === this.song.category.id)[0].name;
    if (createAuthorRequest) {
      createAuthorRequest.subscribe(author => {
        this.song.author = author;
        this.songService.updateUsingPUT4(this.song).subscribe(song => {
          if (coauthorsRequests) {
            coauthorsRequests.subscribe(() => this.goToDetailScreen());
          } else {
            this.goToDetailScreen();
          }
        });
      });
    } else {
      this.songService.updateUsingPUT4(this.song).subscribe(song => {
        if (coauthorsRequests) {
          coauthorsRequests.subscribe(() => this.goToDetailScreen());
        } else {
          this.goToDetailScreen();
        }
      });
    }
  }

  goToDetailScreen() {
    this.router.navigateByUrl('song/' + this.song.id);
  }

  addCouathor() {
    if (this.coauthorToAdd.authorId === -1) {
      this.coauthorsToCreate.push({
        name: this.coauthorToAddName,
        coauthorFunction: this.coauthorToAdd.coauthorFunction
      });
      this.allCoauthors.push({
        coauthor: {authorId: -1, songId: this.song.id, coauthorFunction: this.coauthorToAdd.coauthorFunction},
        name: this.coauthorToAddName
      });
      this.coauthorToAddName = '';
    } else {
      const coauthor: SongCoauthorDTO = {
        songId: this.song.id,
        authorId: this.coauthorToAdd.authorId,
        coauthorFunction: this.coauthorToAdd.coauthorFunction
      };
      this.coauthorsToAdd.push(coauthor);
      this.allCoauthors.push({coauthor, name: this.getCoauthorName(coauthor)});
    }
    this.coauthorToAdd.authorId = -1;
    this.coauthorToAdd.coauthorFunction = null;
  }

  removeCoauthor(coauthorDTO: any) {
    this.allCoauthors.splice(this.allCoauthors.indexOf(coauthorDTO), 1);
    if (coauthorDTO.coauthor.authorId === -1) {
      const item = this.coauthorsToCreate.filter(it => it.name === coauthorDTO.name)[0];
      this.coauthorsToCreate.splice(this.coauthorsToCreate.indexOf(item), 1);
    } else {
      const item = this.coauthorsToAdd.filter(it => it.authorId === coauthorDTO.coauthor.authorId)[0];
      const index = this.coauthorsToAdd.indexOf(item);
      this.coauthorsToAdd.splice(index, 1);
    }
  }

  getCoauthorName(coauthor: SongCoauthorDTO) {
    return this.authors.filter(it => it.id === coauthor.authorId)[0].name;
  }

  removeTag(tag: TagDTO) {
    const index = this.song.tags.indexOf(tag);
    if (index > -1) {
      this.song.tags.splice(index, 1);
    }
    this.saveSong();
  }

  approveSong() {
    this.songService.approveSongUsingPUT(this.song).subscribe(res => this.song = res);
  }
}
