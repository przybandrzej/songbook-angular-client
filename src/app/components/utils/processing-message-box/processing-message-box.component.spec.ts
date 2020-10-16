import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingMessageBoxComponent } from './processing-message-box.component';

describe('ProcessingMessageBoxComponent', () => {
  let component: ProcessingMessageBoxComponent;
  let fixture: ComponentFixture<ProcessingMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
