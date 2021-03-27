import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseEditorComponent } from './verse-editor.component';

describe('VerseEditorComponent', () => {
  let component: VerseEditorComponent;
  let fixture: ComponentFixture<VerseEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
