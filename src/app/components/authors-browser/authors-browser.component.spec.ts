import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsBrowserComponent } from './authors-browser.component';

describe('AuthorsBrowserComponent', () => {
  let component: AuthorsBrowserComponent;
  let fixture: ComponentFixture<AuthorsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
