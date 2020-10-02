import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddedSongsPanelComponent } from './user-added-songs-panel.component';

describe('UserAddedSongsPanelComponent', () => {
  let component: UserAddedSongsPanelComponent;
  let fixture: ComponentFixture<UserAddedSongsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddedSongsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddedSongsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
