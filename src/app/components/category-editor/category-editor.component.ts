import {Component, OnInit} from '@angular/core';
import {CategoryDTO, CategoryRestControllerService, UniversalCreateDTO} from '../..';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {

  category: CategoryDTO = {
    id: 0,
    name: ''
  };

  newCategory: UniversalCreateDTO = {
    id: null,
    name: ''
  };

  isNew = true;

  constructor(private categoryRestControllerService: CategoryRestControllerService, private route: ActivatedRoute, private router: Router, snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.requestCategory(+params.get('id'));
        this.isNew = false;
      }
    });
  }

  requestCategory(id: number) {
    this.categoryRestControllerService.getByIdUsingGET1(id).subscribe(res => this.category = res);
  }

  cancel() {

  }

  saveCategory() {
    if (this.isNew) {
      this.categoryRestControllerService.createUsingPOST1(this.newCategory).subscribe(res => {
        this.isNew = false;
        this.category = res;
      });
    } else {
      this.categoryRestControllerService.updateUsingPUT1(this.category).subscribe(res => this.category = res);
    }
  }
}
