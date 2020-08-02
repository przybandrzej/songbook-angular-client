import {Component, OnInit} from '@angular/core';
import {CategoryDTO, CategoryResourceService, SongResourceService} from '../..';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories-browser',
  templateUrl: './categories-browser.component.html',
  styleUrls: ['./categories-browser.component.scss']
})
export class CategoriesBrowserComponent implements OnInit {

  displayedColumns = ['name', 'song count'];

  selectedCategory: CategoryDTO = {
    id: 0,
    name: ''
  };

  categories: CategoryDTO[] = [];

  constructor(private categoryService: CategoryResourceService, private router: Router, private songService: SongResourceService) {
  }

  ngOnInit(): void {
    this.categoryService.getAllUsingGET2().subscribe(res => this.categories = res);
  }

  addCategory() {
    this.categoryService.createUsingPOST1({id: null, name: this.selectedCategory.name}).subscribe(res => this.selectedCategory = res);
  }

  close() {
    this.router.navigateByUrl('');
  }

  getCategorySongCount(element: CategoryDTO) {
    return 'cannot load resource';
    // this.songService.getByCategoryUsingGET(element.id).subscribe()
  }

  editCategory() {
    this.categoryService.updateUsingPUT1(this.selectedCategory).subscribe(res => this.selectedCategory = res);
  }

  deselect() {
    this.selectedCategory.id = 0;
    this.selectedCategory.name = '';
  }

  select(row: CategoryDTO) {
    this.selectedCategory.id = row.id;
    this.selectedCategory.name = row.name;
  }
}
