import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RechercheAgentsComponent } from './recherche-agents.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('RechercheAgentsComponent', () => {
  let component: RechercheAgentsComponent;
  let fixture: ComponentFixture<RechercheAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheAgentsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheAgentsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('Le composant doit être crée', () => {
    expect(component).toBeTruthy();
  });

  it('Initilaiser le formulaire de recherche par critères', () => {
    expect(component.rechercheLancee).toBeTrue();
    expect(component.agentsForm.value.nom).toBeNull();
  });

  it(`La recherche est bien effectuée`, () => {
    component.rechercherAgents();
    expect(component.rechercheLancee).toBeTrue();
  });

  it('Le critere doit correspondre au champs du formulaire après recherche', () => {
    component.agentsForm.controls.nom.setValue('NomTest');
    component.rechercherAgents();
    expect(component.critere.nom).toEqual('NomTest');
  });
});
