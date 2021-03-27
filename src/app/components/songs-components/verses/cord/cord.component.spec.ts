import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CordComponent } from './cord.component';

describe('CordComponent', () => {
  let component: CordComponent;
  let fixture: ComponentFixture<CordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
