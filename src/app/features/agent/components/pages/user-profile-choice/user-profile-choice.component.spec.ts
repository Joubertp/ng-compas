import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileChoiceComponent } from './user-profile-choice.component';

describe('UserProfileChoiceComponent', () => {
  let component: UserProfileChoiceComponent;
  let fixture: ComponentFixture<UserProfileChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
