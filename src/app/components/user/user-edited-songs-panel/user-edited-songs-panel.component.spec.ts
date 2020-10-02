import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditedSongsPanelComponent } from './user-edited-songs-panel.component';

describe('UserEditedSongsPanelComponent', () => {
  let component: UserEditedSongsPanelComponent;
  let fixture: ComponentFixture<UserEditedSongsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditedSongsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditedSongsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
