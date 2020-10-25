import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TagDTO, TagResourceService} from '../../songbook';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  tagsData: { tag: TagDTO, songCount$: Observable<number> }[] = [];

  constructor(private tagService: TagResourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.tagService.getAllTagsUsingGET().subscribe(res => {
      this.tagsData = res.map(tag => {
        return {tag, songCount$: this.tagService.getSongsByTagUsingGET(tag.id).pipe(map(songs => songs.length))};
      });
    });
  }

  addTag() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedTag.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.tagService.createTagUsingPOST(this.selectedTag).subscribe(res => {
        const copy = this.tagsData.slice();
        copy.push({tag: res, songCount$: this.tagService.getSongsByTagUsingGET(res.id).pipe(map(songs => songs.length))});
        this.tagsData = copy;
        this.selectedTag = res;
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      });
  }

  close() {
    this.router.navigateByUrl('');
  }

  editTag() {
    this.isError = false;
    if (this.nameForm.hasError('pattern') || this.selectedTag.name.length === 0) {
      this.isError = true;
      this.errorMessage = 'Provide valid name';
      return;
    }
    this.tagService.updateTagUsingPUT(this.selectedTag).subscribe(res => {
        this.selectedTag = res;
        const copy = this.tagsData.slice();
        const item = copy.filter(it => it.tag.id === res.id)[0];
        copy.splice(copy.indexOf(item), 1,
          {tag: res, songCount$: this.tagService.getSongsByTagUsingGET(res.id).pipe(map(songs => songs.length))});
        this.tagsData = copy;
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
    this.tagService.deleteTagUsingDELETE(id).subscribe(() => {
      this.deselect();
      const copy = this.tagsData.slice();
      const item = copy.filter(it => it.tag.id === id)[0];
      copy.splice(copy.indexOf(item), 1);
      this.tagsData = copy;
    });
  }

  hasError(form: FormControl, errorCode: string) {
    return form.hasError(errorCode);
  }
}
