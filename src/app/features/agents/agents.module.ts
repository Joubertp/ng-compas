import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgentsRoutingModule } from './agents-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessagesIHM } from 'src/app/shared/messages-ihm.constants';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ListeAgentsComponent } from '../agent/components/pages/liste-agents/liste-agents.component';
import { DetailAgentComponent } from '../agent/components/pages/detail-agent/detail-agent.component';

@NgModule({
  declarations: [
    AccueilComponent,
    ListeAgentsComponent,
    DetailAgentComponent,
  ],
  providers: [MessagesIHM],
  imports: [
    SharedModule,
    AgentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgentsModule {}
