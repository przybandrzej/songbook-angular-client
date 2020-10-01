import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaylistPanelComponent } from './user-playlist-panel.component';

describe('UserPlaylistPanelComponent', () => {
  let component: UserPlaylistPanelComponent;
  let fixture: ComponentFixture<UserPlaylistPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPlaylistPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaylistPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
