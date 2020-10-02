import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryDTO, CategoryResourceService} from '../../songbook';

@Component({
  selector: 'app-categories-browser',
  templateUrl: './categories-browser.component.html',
  styleUrls: ['./categories-browser.component.scss']
})
export class CategoriesBrowserComponent implements OnInit {

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
    this.categoryService.createUsingPOST1(this.selectedCategory).subscribe(res => {
      this.selectedCategory = res;
      const copy = this.categories.slice();
      copy.push(res);
      this.categories = copy;
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
    this.categoryService.updateUsingPUT1(this.selectedCategory).subscribe(res => {
      this.selectedCategory = res;
      const copy = this.categories.slice();
      const item = copy.filter(it => it.id === res.id)[0];
      copy.splice(copy.indexOf(item), 1, res);
      this.categories = copy;
    });
  }

  deselect() {
    this.selectedCategory.id = 0;
    this.selectedCategory.name = '';
  }

  select(row: CategoryDTO) {
    this.selectedCategory.id = row.id;
    this.selectedCategory.name = row.name;
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
}
