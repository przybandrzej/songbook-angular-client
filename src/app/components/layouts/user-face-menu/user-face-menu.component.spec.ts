import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFaceMenuComponent } from './user-face-menu.component';

describe('UserFaceMenuComponent', () => {
  let component: UserFaceMenuComponent;
  let fixture: ComponentFixture<UserFaceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFaceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFaceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
