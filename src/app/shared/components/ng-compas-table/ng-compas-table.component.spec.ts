import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCompasTableComponent } from './ng-compas-table.component';

describe('NgCompasTableComponent', () => {
  let component: NgCompasTableComponent;
  let fixture: ComponentFixture<NgCompasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCompasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCompasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
