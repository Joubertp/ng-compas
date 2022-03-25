import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Agent } from 'src/app/shared/models/agent.model';
import { MessagesIHM } from 'src/app/shared/messages-ihm.constants';

@Component({
  selector: 'app-recherche-agents',
  templateUrl: './recherche-agents.component.html',
  styleUrls: ['../agents/agents.component.css', './recherche_agents.component.css'],
})
/**
 * Classe perméttant d'effectuer une recherche agents par critères
 */
export class RechercheAgentsComponent implements OnInit {
  agentsForm: FormGroup;
  isExpanded = false;
  rechercheLancee = false;

  critere: Agent;

  messageIhm = MessagesIHM;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Méthode qui permet de purger le formulaire et le résultat
   */
  initForm(): void {
    this.rechercheLancee = false;
    this.agentsForm = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      numen: new FormControl(),
      codeEtablissement: new FormControl(),
      codeCorps: new FormControl(),
    });
    this.rechercherAgents();
  }

  /** Méthode qui permet de lancer la recherche avec critères */
  rechercherAgents(): void {
    this.critere = this.agentsForm.value;
    this.rechercheLancee = true;
  }
}
