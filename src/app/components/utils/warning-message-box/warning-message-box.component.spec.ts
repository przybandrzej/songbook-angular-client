import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningMessageBoxComponent } from './warning-message-box.component';

describe('WarningMessageBoxComponent', () => {
  let component: WarningMessageBoxComponent;
  let fixture: ComponentFixture<WarningMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
