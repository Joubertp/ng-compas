import { HttpParams } from '@angular/common/http';
import { Agent } from '../../models/agent.model';

/**
 * Class utilitaire permettant de générer des jeux de données pour les tests unitaires.
 */
export class AgentSample {
  /**
   * Retourne un agent de test avec tous les attributs initialisés.
   */
  static retourneAgent(): Agent {
    return new Agent(
      1,
      'testNom1',
      'testPrenom1',
      'testNumen1',
      'testMail1',
      'testcodeEtablissement1',
      'testcodeCorps1'
    );
  }

  static retourneAgentForm(agent: Agent): object {
    return {
      idAgent: agent.idAgent,
      nom: agent.nom,
      prenom: agent.prenom,
      numen: agent.numen,
      mail: agent.mail,
      departement: { codeElement: 'testDepartement1' },
      etablissement: agent.codeEtablissement,
      typePerso: 'testTypePerso1',
      corps: agent.codeCorps,
    };
  }
  // =========== Prépartion des données pour tester le service de recherche agents paginés =========== //

  /** Préparer le resultat de retour du service (la liste des agents de la première page en JSON ) */
  static getListAgentsPremierePage(): object {
    return {
      content: [
        {
          idAgent: 51,
          prenom: 'FEDLGEDL',
          nom: 'AABEIEDLI',
          numen: '4E01JY0081DLS',
          codeEtablissement: '0930833A',
          codeCorps: 'F00021',
          mail: 'iomfmar.aabeiedli@ac-creteil.fr',
          libelleLongCorps: 'MEN-PROF ECOL EDUC NATI',
          libelleLongEtablissement: 'LYC GT PAUL ELUARD',
        },
        {
          idAgent: 118,
          prenom: 'JCHOKHOU',
          nom: 'AACHLHOUR',
          numen: '4E14CN2046XZY',
          codeEtablissement: '0931978V',
          codeCorps: 'F00021',
          mail: 'kfaousuzia.aachlhour@ac-creteil.fr',
          libelleLongCorps: 'MEN-PROF ECOL EDUC NATI',
          libelleLongEtablissement: 'LYC GT PAUL ELUARD',
        },
      ],
      pageable: {
        sort: {
          unsorted: false,
          sorted: true,
          empty: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 2,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalPages: 4,
      totalElements: 4,
      number: 0,
      size: 2,
      sort: {
        unsorted: false,
        sorted: true,
        empty: false,
      },
      numberOfElements: 2,
      first: true,
      empty: false,
    };
  }

  static retourneUrlAvecCritereAgent(pageSize: number, pageIndex: number, agent: Agent): string {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());
    if (agent) {
      for (const [key, value] of Object.entries(agent)) {
        if (value) {
          params = params.append(key, value);
        }
      }
    }
    return params.toString();
  }
}
