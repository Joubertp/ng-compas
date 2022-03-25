import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDossierAdministratifComponent } from './user-dossier-administratif.component';

describe('UserDossierAdministratifComponent', () => {
  let component: UserDossierAdministratifComponent;
  let fixture: ComponentFixture<UserDossierAdministratifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDossierAdministratifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDossierAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
