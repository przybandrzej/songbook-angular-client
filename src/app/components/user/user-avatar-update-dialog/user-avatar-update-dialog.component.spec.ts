import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarUpdateDialogComponent } from './user-avatar-update-dialog.component';

describe('UserAvatarUpdateDialogComponent', () => {
  let component: UserAvatarUpdateDialogComponent;
  let fixture: ComponentFixture<UserAvatarUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAvatarUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvatarUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
