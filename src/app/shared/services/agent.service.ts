import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, throwError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { Ressources } from 'src/app/app.constants';
import { Agent } from '../models/agent.model';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(
    private http: HttpClient,
    private ressources: Ressources,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('AgentService');
  }

  private handleError: HandleError;

  /**
   * Récupére un agent par son id
   * @param idAgent : l'id de l'agent dont on veut récupérer le détail
   */
  getAgent(idAgent: number): Observable<Agent> {
    return this.http.get<Agent>(this.ressources.urlAgents + idAgent);
  }

  /**
   * Récupere les agents paginés avec critères
   * @param paginator Element contenant le numéro de page et sa taille.
   * @param critere Critere de la recherche
   */
  getAgents(paginator: MatPaginator, critere: Agent): Observable<any> {
    const endpoint = this.ressources.urlAgents;
    let params = new HttpParams()
      .set('page', paginator.pageIndex.toString())
      .set('size', paginator.pageSize.toString());

    if (critere) {
      for (const [key, value] of Object.entries(critere)) {
        if (value) {
          params = params.append(key, value);
        }
      }
    }
    return this.http.get<any>(endpoint, { params });
  }

  /**
   * Récupere les agents paginés et triés avec critères avec DataTable
   * @param paginator Element contenant le numéro de page et sa taille.
   * @param sort Element contenant les informations sur la colonne à trier.
   * @param critere Critere de la recherche
   */
  getAgentsData(
    paginator: MatPaginator,
    sort: MatSort,
    critere: Agent,
    isRechercheLancee: boolean
  ): Observable<any> {
    const endpoint = this.ressources.urlAgentsData;

    let serverColumns = {
      nom: 'nom',
      prenom: 'prenom',
      numen: 'numen',
      etablissement: 'codeEtablissement',
      corps: 'codeCorps',
    };

    let params = new HttpParams()
      .set(
        'start',
        isRechercheLancee ? '0' : (+paginator.pageIndex * +paginator.pageSize).toString()
      )
      .set('length', paginator.pageSize.toString());

    let index = 0;

    for (const [key, value] of Object.entries(serverColumns)) {
      let incrementeIndex = false;

      for (const [cleCritere, valeurCritere] of Object.entries(critere)) {
        if (
          value === cleCritere &&
          (valeurCritere || cleCritere == 'nom' || cleCritere == 'prenom')
        ) {
          params = params
            .set('columns[' + index + '].data', cleCritere)
            .set('columns[' + index + '].search.value', valeurCritere == null ? '' : valeurCritere)
            .set('columns[' + index + '].searchable', 'true')
            .set('columns[' + index + '].orderable', 'true')
            .set('columns[' + index + '].search.regex', 'true');

          incrementeIndex = true;
        }
      }
      if (sort.active === key && sort.direction != '') {
        params = params
          .set('columns[' + index + '].data', value)
          .set('columns[' + index + '].searchable', 'true')
          .set('columns[' + index + '].orderable', 'true')
          .set('order[0].column', index.toString())
          .set('order[0].dir', sort.direction);
        if (sort.active == 'nom') {
          params = params.set('order[1].column', '1').set('order[1].dir', 'asc');
        } else if (sort.active == 'prenom') {
          params = params.set('order[1].column', '0').set('order[1].dir', 'asc');
        } else {
          params = params
            .set('order[1].column', '0')
            .set('order[1].dir', 'asc')
            .set('order[2].column', '1')
            .set('order[2].dir', 'asc');
        }

        incrementeIndex = true;
      }
      if (incrementeIndex) index++;
    }

    return this.http.get<any>(endpoint, { params });
  }

  /**
   * Permet d'ajouter un agent
   * @param agent : l'agent à ajouter
   */
  ajouterAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.ressources.urlAgents, agent);
  }

  /**
   * Permet de modifier un agent
   * @
   * @param agent : l'agent à modifier
   */
  modifierAgent(agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(this.ressources.urlAgents + agent.idAgent, agent);
  }

  /**
   * Permet de supprimer un agent
   * @param idAgent:id de l'agent à supprimer
   */
  supprimerAgent(idAgent: number): Observable<{}> {
    if (idAgent) {
      return this.http.delete(this.ressources.urlAgents + idAgent);
    }
    return throwError(new Error('Identifiant invalide !'));
  }
}
