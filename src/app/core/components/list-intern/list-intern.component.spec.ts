import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInternComponent } from './list-intern.component';

describe('ListInternComponent', () => {
  let component: ListInternComponent;
  let fixture: ComponentFixture<ListInternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
