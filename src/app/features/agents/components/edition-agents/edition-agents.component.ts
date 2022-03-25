import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AgentService } from 'src/app/shared/services/agent.service';
import { NomenclatureService } from 'src/app/shared/services/nomenclature.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Agent } from 'src/app/shared/models/agent.model';
import { Location } from '@angular/common';
import { Departement } from 'src/app/shared/models/departement.model';
import { Etablissement } from 'src/app/shared/models/etablissement.model';
import { TypePersonnel } from 'src/app/shared/models/typePersonnel.model';
import { CorpsPersonnel } from 'src/app/shared/models/corpsPersonnel.model';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { startWith, map } from 'rxjs/operators';
import { MessagesIHM } from 'src/app/shared/messages-ihm.constants';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from 'src/app/shared/components/snack-bar-message/snack-bar-message.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edition-agents',
  templateUrl: './edition-agents.component.html',
  styleUrls: ['../agents/agents.component.css', './edition-agents.component.css'],
})
export class EditionAgentsComponent implements OnInit {
  user: Utilisateur;
  editMode = false;
  souscriptionAgent: Subscription;
  agentForm: FormGroup;
  agentCourant: Agent;
  snackBar: SnackBarMessageComponent;

  loadEtablissements = false;

  // Listes déroulantes du formulaires
  listeDepartements: Departement[];
  listeEtablissements: Etablissement[];
  listeTypePerso: TypePersonnel[];
  listeCorps: CorpsPersonnel[];

  filteredDepartement: Observable<Departement[]>;
  filteredEtablissements: Observable<Etablissement[]>;
  filteredTypePerso: Observable<TypePersonnel[]>;
  filteredCorps: Observable<CorpsPersonnel[]>;

  messageIhm = MessagesIHM;

  constructor(
    private readonly agentService: AgentService,
    private readonly nomenclatureService: NomenclatureService,
    private readonly location: Location,
    private readonly authService: AuthService,
    private readonly utilService: UtilsService, // private readonly snackBar: SnackBarMessageComponent
    private readonly snackBarMat: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<EditionAgentsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.snackBar = new SnackBarMessageComponent(snackBarMat, MAT_SNACK_BAR_DATA);
  }

  ngOnInit(): void {
    this.initForm();
    this.recupererCorpsPersonnel();
    this.recupererDepartement();
    this.chercherEtablissement();
    this.recupererTypePersonnel();

    this.recupererUtilisateurCourant();
    this.recupererAgentCourant();

    this.agentForm?.controls.etablissement?.disable();
    this.agentForm?.controls.corps?.disable();

    if (this.user?.role.consultation) {
      this.agentForm?.disable();
    }
  }

  // --------Initialisation du composant--------

  /**
   * Méthode d'initialisation du formulaire principale. En fonction de la variable editMode,
   * le comportement du formulaire change.
   */
  private initForm(): void {
    this.agentForm = new FormGroup({
      idAgent: new FormControl(this.agentCourant?.idAgent),
      nom: new FormControl(this.agentCourant?.nom, Validators.required),
      prenom: new FormControl(this.agentCourant?.prenom, Validators.required),
      numen: new FormControl(this.agentCourant?.numen, [
        Validators.required,
        Validators.pattern('(^[0-9]{2})([A-Z]{1})([0-9]{7})([A-Z]{3})$'),
      ]),
      mail: new FormControl(this.agentCourant?.mail, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      departement: new FormControl('', this.requireMatch),
      etablissement: new FormControl('', this.requireMatch),
      typePerso: new FormControl('', this.requireMatch),
      corps: new FormControl('', this.requireMatch),
    });

    if (this.editMode && this.user.role.consultation) {
      this.agentForm.disable();
    }
  }

  private recupererAgentCourant(): void {
    this.editMode = this.data?.id > 0;
    if (this.editMode) {
      this.agentService.getAgent(this.data.id).subscribe((agent) => {
        this.agentCourant = agent;
        this.agentForm.controls.idAgent.setValue(this.agentCourant.idAgent);
        this.agentForm.controls.nom.setValue(this.agentCourant.nom);
        this.agentForm.controls.prenom.setValue(this.agentCourant.prenom);
        this.agentForm.controls.numen.setValue(this.agentCourant.numen);
        this.agentForm.controls.mail.setValue(this.agentCourant.mail);
        this.recupererTypePersonnelParCorps();
        this.recupererDepartement();
      });
    }
  }

  private recupererUtilisateurCourant(): void {
    this.authService.currentUserSubject.subscribe(
      (value) => {
        this.user = value;
      },
      (error) => {
        this.utilService.gestionErreurHttp(error);
      }
    );
    this.authService.emitCurrentUserSubject();
  }

  // --------Chargement des listes--------

  private recupererDepartement(): void {
    this.nomenclatureService.recupererDepartement().subscribe({
      next: (value) => {
        this.listeDepartements = value;
        this.filteredDepartement = this.agentForm.controls.departement.valueChanges.pipe(
          startWith(''),
          map((searchedDep) => this._filter(searchedDep, this.listeDepartements))
        );
        if (this.editMode) {
          this.agentForm.controls.departement.setValue(
            this.matcher(
              this.agentCourant?.codeEtablissement.substring(0, 3),
              this.listeDepartements
            )
          );
          this.chercherEtablissement();
        }
      },
      error: (err) => {
        this.utilService.gestionErreurHttp(err);
      },
    });
  }
  private recupererTypePersonnel(): void {
    this.nomenclatureService.recupererTypePersonnel().subscribe({
      next: (value) => {
        this.listeTypePerso = value;
        this.filteredTypePerso = this.agentForm.controls.typePerso?.valueChanges.pipe(
          startWith(''),
          map((searchedTypePerso) => this._filter(searchedTypePerso, this.listeTypePerso))
        );
      },
      error: (err) => {
        this.utilService.gestionErreurHttp(err);
      },
    });
  }

  /**
   * Permet de recuperer les etablissement à part du département.
   */
  chercherEtablissement(): void {
    this.agentForm.controls.etablissement.disable();

    if (this.agentForm?.value?.departement?.codeElement) {
      this.loadEtablissements = true;
      this.nomenclatureService
        .recupererEtablissement(this.agentForm?.value?.departement?.codeElement)
        .subscribe((etablissement) => {
          this.listeEtablissements = etablissement;
          this.filteredEtablissements = this.agentForm.controls.etablissement.valueChanges.pipe(
            startWith(''),
            map((searchedDep) => this._filter(searchedDep, this.listeEtablissements))
          );
          this.agentForm?.controls?.etablissement.setValue(
            this.matcher(this.agentCourant?.codeEtablissement, this.listeEtablissements)
          );
          if (etablissement?.length > 0 && !this.user.role.consultation) {
            this.agentForm.controls.etablissement.enable();
          }
          this.loadEtablissements = false;
        });
    }
  }

  recupererCorpsPersonnel(): void {
    this.agentForm.controls.corps.disable();
    this.nomenclatureService
      .recupererCorpsPersonnel(this.agentForm.value.typePerso?.codeElement)
      .subscribe((corps) => {
        this.listeCorps = corps;

        this.filteredCorps = this.agentForm.controls.corps?.valueChanges.pipe(
          startWith(''),
          map((searchedCorpsPerso) => this._filter(searchedCorpsPerso, this.listeCorps))
        );

        this.agentForm.controls.corps.setValue(
          this.matcher(this.agentCourant?.codeCorps, this.listeCorps)
        );

        if (
          corps?.length > 0 &&
          !this.user?.role.consultation &&
          (this.agentForm.controls?.typePerso.value || this.agentCourant?.codeCorps)
        ) {
          this.agentForm.controls.corps.enable();
        }
      });
  }

  /**
   * Chargement de la liste déroulante du typePersonnel à partir du corps
   */
  private recupererTypePersonnelParCorps(): void {
    this.nomenclatureService.recupererTypePersonnelParCorps(this.agentCourant.codeCorps).subscribe({
      next: (value) => {
        this.agentForm.controls.typePerso.setValue(
          this.matcher(value.values().next().value.codeElement, this.listeTypePerso)
        );
      },
      error: (err) => {
        this.utilService.gestionErreurHttp(err);
      },
    });
  }

  // --------Action de la page--------

  /**
   * Methode permetant d'avoir accès au controles du formulaire plus facilement.
   */
  get f(): { [key: string]: AbstractControl } {
    return this.agentForm.controls;
  }

  /**
   * Méthode déclenchée par le bouton 'Retour' du formulaire
   */
  annuler(): void {
    this.location.back();
  }

  /**
   * Méthode déclenchée par la soumission du formulaire. On vérifie que le formulaire
   * est valide en rapport avec les règles de gestions établies à la déclaration du
   * formulaire.
   */
  enregistrer(): void {
    this.agentForm.disable();
    if (this.editMode) {
      this.souscriptionAgent = this.agentService.modifierAgent(this.formAgentToAgent()).subscribe(
        (res) => {
          this.snackBar.success(`L'Agent ${res.nom} ${res.prenom} a été modifié`);
          this.dialogRef.close();
        },
        (error) => {
          this.utilService.gestionErreurHttp(error);
        }
      );
    } else {
      this.souscriptionAgent = this.agentService.ajouterAgent(this.formAgentToAgent()).subscribe(
        (res) => {
          this.snackBar.success(`L'Agent ${res.nom} ${res.prenom} a été ajouté`);
          this.annuler();
        },
        (error) => {
          this.utilService.gestionErreurHttp(error);
        }
      );
    }
  }

  private formAgentToAgent(): Agent {
    const elt = this.agentForm.controls;

    return new Agent(
      elt.id?.value ?? this.agentCourant?.idAgent,
      elt.nom.value,
      elt.prenom.value,
      elt.numen.value,
      elt.mail.value,
      elt.etablissement?.value.codeUsi ?? this.agentCourant?.codeEtablissement,
      elt.corps?.value.codeElement ?? this.agentCourant?.codeCorps
    );
  }

  nOngOnDestroy(): void {
    this.agentCourant = null;
  }

  // ----------------Gestion des filtres----------------

  private matcher(search: string, lstMatch: any[]): any {
    return lstMatch?.filter((element) =>
      element?.libelleImpression?.toLowerCase().includes(search?.toLowerCase())
    )[0];
  }

  private _filter(search: any, lstMatch: any[]): any[] {
    let filterValue = '';
    if (typeof search === 'string') {
      filterValue = search.toLowerCase();
    }

    return lstMatch.filter((element) =>
      element.libelleImpression.toLowerCase().includes(filterValue)
    );
  }

  displayFn(elt: any): string {
    return elt?.libelleImpression;
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    if (typeof control.value === 'string') {
      return { requireMatch: true };
    }
    return null;
  }
}
