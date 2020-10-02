import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongsPanelComponent } from './user-songs-panel.component';

describe('UserSongsPanelComponent', () => {
  let component: UserSongsPanelComponent;
  let fixture: ComponentFixture<UserSongsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSongsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSongsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
