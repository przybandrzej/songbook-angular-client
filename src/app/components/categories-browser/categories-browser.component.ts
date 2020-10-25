import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryDTO, CategoryResourceService} from '../../songbook';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  categoriesData: { category: CategoryDTO, songCount$: Observable<number> }[] = [];

  constructor(private categoryService: CategoryResourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategoriesUsingGET().subscribe(res => {
      this.categoriesData = res.map(category => {
        return {category, songCount$: this.categoryService.getSongsByCategoryIdUsingGET(category.id).pipe(map(songs => songs.length))};
      });
    });
  }

  addCategory() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedCategory.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.categoryService.createCategoryUsingPOST(this.selectedCategory).subscribe(res => {
        this.selectedCategory = res;
        const copy = this.categoriesData.slice();
        copy.push({category: res, songCount$: this.categoryService.getSongsByCategoryIdUsingGET(res.id).pipe(map(songs => songs.length))});
        this.categoriesData = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  close() {
    this.router.navigateByUrl('');
  }

  getCategorySongCount(element: CategoryDTO): Observable<number> {
    return this.categoryService.getSongsByCategoryIdUsingGET(element.id).pipe(map(it => it.length));
  }

  editCategory() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedCategory.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.categoryService.updateCategoryUsingPUT(this.selectedCategory).subscribe(res => {
        this.selectedCategory = res;
        const copy = this.categoriesData.slice();
        const item = copy.filter(it => it.category.id === res.id)[0];
        copy.splice(copy.indexOf(item), 1, {
          category: res,
          songCount$: this.categoryService.getSongsByCategoryIdUsingGET(res.id).pipe(map(songs => songs.length))
        });
        this.categoriesData = copy;
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
    this.categoryService.deleteCategoryUsingDELETE(id).subscribe(() => {
      this.deselect();
      const copy = this.categoriesData.slice();
      const item = copy.filter(it => it.category.id === id)[0];
      copy.splice(copy.indexOf(item), 1);
      this.categoriesData = copy;
    });
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }
}
