import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TagDTO, TagResourceService} from '../../songbook';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tags-browser',
  templateUrl: './tags-browser.component.html',
  styleUrls: ['./tags-browser.component.scss']
})
export class TagsBrowserComponent implements OnInit {

  nameForm = new FormControl('', [Validators.pattern('^[a-zA-Z 0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,40}$')]);
  isError = false;
  errorMessage = '';

  displayedColumns = ['name', 'song count', 'actions'];

  selectedTag: TagDTO = {
    id: 0,
    name: ''
  };

  tags: TagDTO[] = [];

  constructor(private tagService: TagResourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.tagService.getAllUsingGET5().subscribe(res => this.tags = res);
  }

  addTag() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedTag.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.tagService.createUsingPOST5(this.selectedTag).subscribe(res => {
        this.selectedTag = res;
        const copy = this.tags.slice();
        copy.push(res);
        this.tags = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  close() {
    this.router.navigateByUrl('');
  }

  getTagSongCount(element: TagDTO) {
    return 'not implemented yet';
    // this.songService.getByTagUsingGET(element.id).subscribe()
  }

  editTag() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedTag.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.tagService.updateUsingPUT5(this.selectedTag).subscribe(res => {
        this.selectedTag = res;
        const copy = this.tags.slice();
        const item = copy.filter(it => it.id === res.id)[0];
        copy.splice(copy.indexOf(item), 1, res);
        this.tags = copy;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  deselect() {
    this.selectedTag.id = 0;
    this.selectedTag.name = '';
    this.isError = false;
    this.errorMessage = '';
  }

  select(row: TagDTO) {
    this.selectedTag.id = row.id;
    this.selectedTag.name = row.name;
    this.isError = false;
    this.errorMessage = '';
  }

  delete(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.tagService.deleteUsingDELETE5(id).subscribe(() => {
      this.deselect();
      const copy = this.tags.slice();
      const item = copy.filter(it => it.id === id)[0];
      copy.splice(copy.indexOf(item), 1,);
      this.tags = copy;
    });
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }
}
