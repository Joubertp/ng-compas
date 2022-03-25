import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocumentsConsultablesComponent } from './user-documents-consultables.component';

describe('UserDocumentsConsultablesComponent', () => {
  let component: UserDocumentsConsultablesComponent;
  let fixture: ComponentFixture<UserDocumentsConsultablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDocumentsConsultablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDocumentsConsultablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
