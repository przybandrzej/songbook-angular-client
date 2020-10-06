import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessageBoxComponent } from './success-message-box.component';

describe('SuccessMessageBoxComponent', () => {
  let component: SuccessMessageBoxComponent;
  let fixture: ComponentFixture<SuccessMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
