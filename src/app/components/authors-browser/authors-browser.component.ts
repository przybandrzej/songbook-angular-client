import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorDTO, AuthorResourceService, CategoryDTO, UniversalCreateDTO} from '../../songbook';
import {FormControl, Validators} from '@angular/forms';

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

  authors: AuthorDTO[] = [];

  constructor(private router: Router, private authorService: AuthorResourceService) {
  }

  ngOnInit(): void {
    this.authorService.getAllUsingGET().subscribe(res => this.authors = res);
  }

  close() {
    this.router.navigateByUrl('');
  }

  getAuthorSongCount(element: CategoryDTO) {
    return 'not implemented yet';
    // this.songService.getByCategoryUsingGET(element.id).subscribe()
  }

  addAuthor() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedAuthor.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.authorService.createUsingPOST(this.selectedAuthor).subscribe(res => {
        this.selectedAuthor = res;
        const copy = this.authors.slice();
        copy.push(res);
        this.authors = copy;
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
    this.authorService.updateUsingPUT(this.selectedAuthor).subscribe(res => {
        this.selectedAuthor = res;
        const copy = this.authors.slice();
        const item = copy.filter(it => it.id === res.id)[0];
        copy.splice(copy.indexOf(item), 1, res);
        this.authors = copy;
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

  select(row: CategoryDTO) {
    this.selectedAuthor.id = row.id;
    this.selectedAuthor.name = row.name;
    this.isError = false;
    this.errorMessage = '';
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.authorService.deleteUsingDELETE(id).subscribe(() => {
      this.deselect();
      const copy = this.authors.slice();
      const item = copy.filter(it => it.id === id)[0];
      copy.splice(copy.indexOf(item), 1,);
      this.authors = copy;
    });
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }

}
