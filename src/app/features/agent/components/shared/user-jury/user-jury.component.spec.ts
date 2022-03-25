import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJuryComponent } from './user-jury.component';

describe('UserJuryComponent', () => {
  let component: UserJuryComponent;
  let fixture: ComponentFixture<UserJuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
