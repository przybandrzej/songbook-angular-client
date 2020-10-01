import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePanelComponent } from './user-profile-panel.component';

describe('UserProfilePanelComponent', () => {
  let component: UserProfilePanelComponent;
  let fixture: ComponentFixture<UserProfilePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
