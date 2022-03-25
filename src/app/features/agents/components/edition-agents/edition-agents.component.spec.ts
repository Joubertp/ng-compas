import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditionAgentsComponent } from './edition-agents.component';
import { Ressources } from 'src/app/app.constants';
import { RouterTestingModule } from '@angular/router/testing';
import { AgentService } from 'src/app/shared/services/agent.service';
import { NomenclatureService } from 'src/app/shared/services/nomenclature.service';
import { of, Subject, Subscription, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AgentSample } from 'src/app/shared/services/initialiseurs-test/agent.sample';
import { NomenclatureSample } from 'src/app/shared/services/initialiseurs-test/nomenclature.sample';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorHttpMessage } from 'src/app/shared/utils/error-http-message';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Role } from 'src/app/shared/models/role.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { UtilisateurSample } from 'src/app/shared/services/initialiseurs-test/utilisateur.sample';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('EditionAgentsComponent', () => {
  let component: EditionAgentsComponent;
  let fixture: ComponentFixture<EditionAgentsComponent>;

  const espionAgentService = jasmine.createSpyObj('AgentService', [
    'ajouterAgent',
    'modifierAgent',
    'getAgent',
  ]);
  const espionNomenclatureService = jasmine.createSpyObj('NomenclatureService', [
    'recupererDepartement',
    'recupererEtablissement',
    'recupererTypePersonnel',
    'recupererTypePersonnelParCorps',
    'recupererCorpsPersonnel',
  ]);
  const espionSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
  const espionAuthService = jasmine.createSpyObj('AuthService', [
    'currentUser',
    'emitCurrentUserSubject',
    'currentUserSubject',
  ]);
  const espionUtilsService = jasmine.createSpyObj('UtilsService', ['gestionErreurHttp']);

  const espionMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const agentConsulte = AgentSample.retourneAgent();
  const listeDepartement = NomenclatureSample.retourneListeDepartement(3);
  const listeEtablissement = NomenclatureSample.retourneListeEtablissement(3);
  const listeTypePersonnel = NomenclatureSample.retourneListeTypePersonnel(3);
  const listeCorps = NomenclatureSample.retourneListeCorpPersonnel(3);

  const observableDepartement = of(listeDepartement);
  const observableEtablissement = of(listeEtablissement);
  const observableTypePersonnel = of(listeTypePersonnel);
  const observableCorps = of(listeCorps);
  const observableAgent = of(agentConsulte);

  const errorObj = { error: { description: ErrorHttpMessage[0] } };
  const error = throwError(errorObj);
  const user = UtilisateurSample.retournerUtilisateur(Ressources.GESTION);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatAutocompleteModule,
      ],
      declarations: [EditionAgentsComponent],
      providers: [
        Ressources,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: null }),
          },
        },
        { provide: AgentService, useValue: espionAgentService },
        { provide: NomenclatureService, useValue: espionNomenclatureService },
        { provide: AuthService, useValue: espionAuthService },
        { provide: MatSnackBar, useValue: espionSnackBar },
        { provide: UtilsService, useValue: espionUtilsService },
        { provide: MatDialogRef, useValue: espionMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    // On paramètre les espions pour qu'ils interceptent les appels au services.
    espionAgentService.ajouterAgent.and.returnValue(observableAgent);
    espionAgentService.modifierAgent.and.returnValue(observableAgent);
    espionAgentService.getAgent.and.returnValue(observableAgent);
    espionNomenclatureService.recupererDepartement.and.returnValue(observableDepartement);
    espionNomenclatureService.recupererEtablissement.and.returnValue(observableEtablissement);
    espionNomenclatureService.recupererTypePersonnel.and.returnValue(observableTypePersonnel);
    espionNomenclatureService.recupererTypePersonnelParCorps.and.returnValue(
      observableTypePersonnel
    );
    espionNomenclatureService.recupererCorpsPersonnel.and.returnValue(observableCorps);
    espionSnackBar.openFromComponent.and.returnValue(null);
    espionAuthService.currentUserSubject = new Subject();
    espionUtilsService.gestionErreurHttp.calls.reset();
    espionUtilsService.gestionErreurHttp.and.returnValue(null);

    fixture = TestBed.createComponent(EditionAgentsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    espionAuthService.currentUserSubject.next(user);
  }));

  it('Le composant doit être crée', () => {
    expect(component).toBeTruthy();
  });

  it('Le service de nomenclature renvoi une erreur lors de la récupération des types personnels', () => {
    espionNomenclatureService.recupererTypePersonnel.and.returnValue(error);
    component.ngOnInit();
    expect(espionUtilsService.gestionErreurHttp).toHaveBeenCalledWith(errorObj);
  });

  it('Le service de nomenclature renvoi une erreur lors de la récupération des départements', () => {
    espionNomenclatureService.recupererDepartement.and.returnValue(error);
    component.ngOnInit();
    expect(espionUtilsService.gestionErreurHttp).toHaveBeenCalledWith(errorObj);
  });

  it('On retrouve bien le corpsPersonnel à partir du type personnel', () => {
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    component.recupererCorpsPersonnel();
    expect(component.listeCorps).toEqual(listeCorps);
  });

  it(`L'envoi du formulaire est bien effectué en mode edition`, () => {
    component.editMode = true;
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    component.enregistrer();
    const agendModifie = 'Agent "' + agentConsulte.numen + '" modifié';
    expect(component.souscriptionAgent).toBeTruthy();
    expect(component.souscriptionAgent).toBeInstanceOf(Subscription);
  });

  it(`L'envoi du formulaire est bien effectué en mode création`, () => {
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    component.enregistrer();
    expect(component.souscriptionAgent).toBeTruthy();
    expect(component.souscriptionAgent).toBeInstanceOf(Subscription);
  });

  it(`La méthode 'f' renvoi bien les contrôles du formulaire`, () => {
    expect(component.f.corps).toBeInstanceOf(FormControl);
    expect(component.f.departement).toBeInstanceOf(FormControl);
    expect(component.f.etablissement).toBeInstanceOf(FormControl);
    expect(component.f.typePerso).toBeInstanceOf(FormControl);
    expect(component.f.idAgent).toBeInstanceOf(FormControl);
    expect(component.f.mail).toBeInstanceOf(FormControl);
    expect(component.f.nom).toBeInstanceOf(FormControl);
    expect(component.f.numen).toBeInstanceOf(FormControl);
    expect(component.f.prenom).toBeInstanceOf(FormControl);
  });

  it(`L'envoi du formulaire renvoi une erreur en mode création`, () => {
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    espionAgentService.ajouterAgent.and.returnValue(error);
    component.enregistrer();
    expect(espionUtilsService.gestionErreurHttp).toHaveBeenCalledWith(errorObj);
  });

  it(`L'envoi du formulaire renvoi une erreur en mode edition`, () => {
    component.editMode = true;
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    espionAgentService.modifierAgent.and.returnValue(error);
    component.enregistrer();
    expect(espionUtilsService.gestionErreurHttp).toHaveBeenCalledWith(errorObj);
  });

  it(`On a la liste déroulante des corps désactivé lorsqu'il n'y a aucun corps présent`, () => {
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    espionNomenclatureService.recupererCorpsPersonnel.and.returnValue(of([]));
    component.recupererCorpsPersonnel();
    expect(component.listeCorps).toEqual([]);
    expect(component.agentForm.controls.corps.disabled).toEqual(true);
  });

  it('Lorsque la liste déroulante des types personnels est vide', () => {
    espionNomenclatureService.recupererCorpsPersonnel.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.listeCorps).toEqual([]);
    expect(component.agentForm.controls.corps.disabled).toEqual(true);
  });

  it(`On a la liste déroulante des établissements désactivé lorsqu'il n'y a aucun département choisi`, () => {
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    espionNomenclatureService.recupererEtablissement.and.returnValue(of([]));
    component.chercherEtablissement();
    expect(component.listeEtablissements).toEqual([]);
    expect(component.agentForm.controls.corps.disabled).toEqual(true);
  });

  it(`On a la liste déroulante des etablissements désactivé lorsqu'il n'y a aucun etablissement présent dans le département choisi`, () => {
    component.agentForm.setValue(AgentSample.retourneAgentForm(agentConsulte));
    espionNomenclatureService.recupererEtablissement.and.returnValue(of([]));
    component.chercherEtablissement();
    expect(component.listeEtablissements).toEqual([]);
    expect(component.agentForm.controls.etablissement.disabled).toEqual(true);
  });

  it(`Le type personnel n'a pas de corps associés en mode edition`, () => {
    TestBed.inject(ActivatedRoute).params = of({ id: 1 });
    espionNomenclatureService.recupererCorpsPersonnel.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.agentForm.controls.corps.disabled).toEqual(true);
  });

  it(`L'agent courant est réinitialiser lors de la destruction du composant.`, () => {
    component.nOngOnDestroy();
    expect(component.agentCourant).toBeNull();
  });

  it(`Le formulaire est inactif en mode edition.`, () => {
    espionAuthService.currentUserSubject.subscribe(() => {
      component.editMode = true;
      component.ngOnInit();
      expect(component.agentForm.disabled).toBeTrue();
    });
    user.role = new Role(false, true);
    espionAuthService.currentUserSubject.next(user);
  });

  it(`La méthode displayFn renvoi bien le libelle d'Impression`, () => {
    const element = { libelleImpression: 'LibelleImpressionTest' };
    expect(component.displayFn(element)).toEqual(element.libelleImpression);
  });

  it(`Une erreur est déclenchée lors de la récupération de l'utilisateur courant`, () => {
    espionAuthService.currentUserSubject.error('error');
    expect(espionUtilsService.gestionErreurHttp).toHaveBeenCalledTimes(1);
  });
});
