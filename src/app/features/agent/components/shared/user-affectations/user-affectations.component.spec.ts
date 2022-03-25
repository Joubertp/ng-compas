import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAffectationsComponent } from './user-affectations.component';

describe('UserAffectationsComponent', () => {
  let component: UserAffectationsComponent;
  let fixture: ComponentFixture<UserAffectationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAffectationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
