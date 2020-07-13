import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBrowserComponent } from './categories-browser.component';

describe('CategoriesBrowserComponent', () => {
  let component: CategoriesBrowserComponent;
  let fixture: ComponentFixture<CategoriesBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
