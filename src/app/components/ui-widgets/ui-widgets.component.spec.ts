import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiWidgetsComponent } from './ui-widgets.component';

describe('UiWidgetsComponent', () => {
  let component: UiWidgetsComponent;
  let fixture: ComponentFixture<UiWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
