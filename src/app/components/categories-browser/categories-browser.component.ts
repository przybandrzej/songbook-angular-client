import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryDTO, CategoryResourceService} from '../../songbook';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-categories-browser',
  templateUrl: './categories-browser.component.html',
  styleUrls: ['./categories-browser.component.scss']
})
export class CategoriesBrowserComponent implements OnInit {

  nameForm = new FormControl('', [Validators.pattern('^[a-zA-Z 0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,40}$')]);
  isError = false;
  errorMessage = '';

  displayedColumns = ['name', 'song count', 'actions'];

  selectedCategory: CategoryDTO = {
    id: 0,
    name: ''
  };

  categories: CategoryDTO[] = [];

  constructor(private categoryService: CategoryResourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getAllUsingGET2().subscribe(res => this.categories = res);
  }

  addCategory() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedCategory.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.categoryService.createUsingPOST1(this.selectedCategory).subscribe(res => {
        this.selectedCategory = res;
        const copy = this.categories.slice();
        copy.push(res);
        this.categories = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  close() {
    this.router.navigateByUrl('');
  }

  getCategorySongCount(element: CategoryDTO) {
    return 'not implemented yet';
    // this.songService.getByCategoryUsingGET(element.id).subscribe()
  }

  editCategory() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedCategory.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.categoryService.updateUsingPUT1(this.selectedCategory).subscribe(res => {
        this.selectedCategory = res;
        const copy = this.categories.slice();
        const item = copy.filter(it => it.id === res.id)[0];
        copy.splice(copy.indexOf(item), 1, res);
        this.categories = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  deselect() {
    this.selectedCategory.id = 0;
    this.selectedCategory.name = '';
    this.isError = false;
    this.errorMessage = '';
  }

  select(row: CategoryDTO) {
    this.selectedCategory.id = row.id;
    this.selectedCategory.name = row.name;
    this.isError = false;
    this.errorMessage = '';
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.categoryService.deleteUsingDELETE1(id).subscribe(() => {
      this.deselect();
      const copy = this.categories.slice();
      const item = copy.filter(it => it.id === id)[0];
      copy.splice(copy.indexOf(item), 1,);
      this.categories = copy;
    });
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }
}
