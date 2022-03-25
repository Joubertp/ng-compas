import { Component, OnInit } from '@angular/core';
import { AgentsContexteService } from '../../../../agents/services/agents-contexte.service';
import { AgentView } from '../../../../agents/models/AgentView';

@Component({
  selector: 'app-liste-agents',
  templateUrl: './liste-agents.component.html',
  styleUrls: ['./liste-agents.component.css']
})
export class ListeAgentsComponent implements OnInit {

  listAgents: Array<AgentView>
  dataTable: Array<Object>
  noPage: number
  taillePage: number
  totalItems: number
  displayedColumns: string[] = ["nom","nomUsage","prenom","courriel","discipline"];

  constructor(private agentsContexteService: AgentsContexteService) { }

  ngOnInit(): void {

    this.agentsContexteService.getObeservableAgentList()
      .subscribe(r => {
        this.noPage = r.number + 1
        this.taillePage = r.size
        this.totalItems = r.totalElements
        this.listAgents = r.content
      })

  }


}
