import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVisistesComponent } from './user-visistes.component';

describe('UserVisistesComponent', () => {
  let component: UserVisistesComponent;
  let fixture: ComponentFixture<UserVisistesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVisistesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVisistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
