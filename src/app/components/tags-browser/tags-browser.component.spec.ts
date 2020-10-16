import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsBrowserComponent } from './tags-browser.component';

describe('TagsBrowserComponent', () => {
  let component: TagsBrowserComponent;
  let fixture: ComponentFixture<TagsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
