import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongInstructionsDialogComponent } from './song-instructions-dialog.component';

describe('SongInstructionsDialogComponent', () => {
  let component: SongInstructionsDialogComponent;
  let fixture: ComponentFixture<SongInstructionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongInstructionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongInstructionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
