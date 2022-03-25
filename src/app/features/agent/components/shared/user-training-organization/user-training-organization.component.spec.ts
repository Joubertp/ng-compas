import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainingOrganizationComponent } from './user-training-organization.component';

describe('UserTrainingOrganizationComponent', () => {
  let component: UserTrainingOrganizationComponent;
  let fixture: ComponentFixture<UserTrainingOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrainingOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrainingOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
