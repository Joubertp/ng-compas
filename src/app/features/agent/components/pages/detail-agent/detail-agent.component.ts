import { Component, OnInit } from '@angular/core';
import { AgentProfile } from '../../../../agents/models/AgentProfile';
import { AgentContexteService } from '../../../../agents/services/agent-contexte.service';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.css']
})
export class DetailAgentComponent implements OnInit {

  agent: AgentProfile

  constructor(private agentContextService: AgentContexteService) { }

  ngOnInit(): void {

    this.agentContextService.getObeservableAgent()
    .subscribe(r => {
      this.agent = r
    })

  }

}
