import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorDTO, AuthorResourceService} from '../../songbook';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-authors-browser',
  templateUrl: './authors-browser.component.html',
  styleUrls: ['./authors-browser.component.scss']
})
export class AuthorsBrowserComponent implements OnInit {

  nameForm = new FormControl('', [Validators.pattern('^[a-zA-Z 0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,40}$')]);
  isError = false;
  errorMessage = '';

  displayedColumns = ['name', 'song count', 'actions'];

  selectedAuthor: AuthorDTO = {
    id: 0,
    name: ''
  };

  authorsData: { author: AuthorDTO, songCount$: Observable<number> }[] = [];

  constructor(private router: Router, private authorService: AuthorResourceService) {
  }

  ngOnInit(): void {
    this.authorService.getAllAuthorsUsingGET().subscribe(res => {
      this.authorsData = res.map(author => {
        return {author, songCount$: this.authorService.getSongsByAuthorIdUsingGET(author.id).pipe(map(songs => songs.length))};
      });
    });
  }

  close() {
    this.router.navigateByUrl('');
  }

  getAuthorSongCount(element: AuthorDTO): Observable<number> {
    return this.authorService.getSongsByAuthorIdUsingGET(element.id).pipe(map(it => it.length));
  }

  addAuthor() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedAuthor.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.authorService.createAuthorUsingPOST(this.selectedAuthor).subscribe(res => {
        this.selectedAuthor = res;
        const copy = this.authorsData.slice();
        copy.push({author: res, songCount$: this.authorService.getSongsByAuthorIdUsingGET(res.id).pipe(map(songs => songs.length))});
        this.authorsData = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  editAuthor() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedAuthor.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.authorService.updateAuthorUsingPUT(this.selectedAuthor).subscribe(res => {
        this.selectedAuthor = res;
        const copy = this.authorsData.slice();
        const item = copy.filter(it => it.author.id === res.id)[0];
        copy.splice(copy.indexOf(item), 1, {
          author: res,
          songCount$: this.authorService.getSongsByAuthorIdUsingGET(res.id).pipe(map(songs => songs.length))
        });
        this.authorsData = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  deselect() {
    this.selectedAuthor.id = 0;
    this.selectedAuthor.name = '';
    this.isError = false;
    this.errorMessage = '';
  }

  select(row: AuthorDTO) {
    this.selectedAuthor.id = row.id;
    this.selectedAuthor.name = row.name;
    this.isError = false;
    this.errorMessage = '';
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.authorService.deleteAuthorUsingDELETE(id).subscribe(() => {
      this.deselect();
      const copy = this.authorsData.slice();
      const item = copy.filter(it => it.author.id === id)[0];
      copy.splice(copy.indexOf(item), 1);
      this.authorsData = copy;
    });
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }

}
