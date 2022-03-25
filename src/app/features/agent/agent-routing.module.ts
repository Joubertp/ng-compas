import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgentComponent } from './components/shared/agent/agent.component';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { UserProfileChoiceComponent } from './components/pages/user-profile-choice/user-profile-choice.component';
import { ListStagiairesComponent } from './components/pages/list-stagiaires/list-stagiaires.component';
import { AccueilGestionComponent } from './components/pages/accueil-gestion/accueil-gestion.component';
import { DetailStagiaireComponent } from './components/pages/detail-stagiaire/detail-stagiaire.component';
import { DetailAgentComponent } from './components/pages/detail-agent/detail-agent.component';
import { ListeAgentsComponent } from './components/pages/liste-agents/liste-agents.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AgentComponent,
    children: [
      { path: 'accueil', component: AccueilComponent, },
      { path: 'gestion/accueil', component: AccueilGestionComponent, },
      { path: 'profileChoice', component: UserProfileChoiceComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'suivi/stagiaire', component: ListStagiairesComponent, },
      { path: 'suivi/stagiaire/**', component: DetailStagiaireComponent, },
      { path: 'agents/list', component: ListeAgentsComponent, },
      { path: 'agents/detail/**', component: DetailAgentComponent, },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule { }
