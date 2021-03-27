import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CordEditorComponent } from './cord-editor.component';

describe('CordEditorComponent', () => {
  let component: CordEditorComponent;
  let fixture: ComponentFixture<CordEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CordEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
