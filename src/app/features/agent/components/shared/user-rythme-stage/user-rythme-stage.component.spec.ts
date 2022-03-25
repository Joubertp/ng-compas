import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRythmeStageComponent } from './user-rythme-stage.component';

describe('UserRythmeStageComponent', () => {
  let component: UserRythmeStageComponent;
  let fixture: ComponentFixture<UserRythmeStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRythmeStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRythmeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
