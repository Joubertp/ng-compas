import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgentComponent } from './components/shared/agent/agent.component';
import { AgentRoutingModule } from './agent-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessagesIHM } from 'src/app/shared/messages-ihm.constants';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { UserDocumentsConsultablesComponent } from './components/shared/user-documents-consultables/user-documents-consultables.component';
import { UserAffectationsComponent } from './components/shared/user-affectations/user-affectations.component';
import { UserInformationsComponent } from './components/shared/user-informations/user-informations.component';
import { UserJuryComponent } from './components/shared/user-jury/user-jury.component';
import { UserTrainingOrganizationComponent } from './components/shared/user-training-organization/user-training-organization.component';
import { UserSpaceComponent } from './components/shared/user-space/user-space.component';
import { UserLinksComponent } from './components/shared/user-links/user-links.component';
import { UserVisistesComponent } from './components/shared/user-visistes/user-visistes.component';
import { UserRythmeStageComponent } from './components/shared/user-rythme-stage/user-rythme-stage.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UserProfileChoiceComponent } from './components/pages/user-profile-choice/user-profile-choice.component';
import { AccueilGestionComponent } from './components/pages/accueil-gestion/accueil-gestion.component';
import { ListStagiairesComponent } from './components/pages/list-stagiaires/list-stagiaires.component';
import { DetailStagiaireComponent } from './components/pages/detail-stagiaire/detail-stagiaire.component';


@NgModule({
  declarations: [
    AccueilComponent,
    AgentComponent,
    UserDocumentsConsultablesComponent, 
    UserAffectationsComponent,
    UserInformationsComponent,
    UserJuryComponent,
    UserTrainingOrganizationComponent,
    UserSpaceComponent,
    UserLinksComponent,
    UserVisistesComponent,
    UserRythmeStageComponent,
    UserProfileComponent,
    UserProfileChoiceComponent,
    AccueilGestionComponent,
    ListStagiairesComponent,
    DetailStagiaireComponent
  ],
  providers: [MessagesIHM],
  imports: [
    SharedModule,
    AgentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgentModule {}
