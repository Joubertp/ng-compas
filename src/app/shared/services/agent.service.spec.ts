import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgentService } from './agent.service';
import { Ressources } from 'src/app/app.constants';
import { AgentSample } from './initialiseurs-test/agent.sample';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';

describe('AgentService', () => {
  let service: AgentService;
  let httpTestingController: HttpTestingController;
  let ressources: Ressources;
  let matPaginator: MatPaginator;

  const agentAttendu = AgentSample.retourneAgent();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AgentService,
        Ressources,
        HttpErrorHandler,
        MessageService,
        { provide: MatPaginator, useValue: { pageSize: 5, pageIndex: 1 } },
      ],
    });
    service = TestBed.inject(AgentService);
    httpTestingController = TestBed.inject(HttpTestingController);
    ressources = TestBed.inject(Ressources);
    matPaginator = TestBed.inject(MatPaginator);
  });

  /**
   * Vérifie que le service s'initialise correctement à travers le constructeur.
   */
  it('Le composant doit être crée', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Vérifie que le service renvoi bien un Observable d'Agent après un ajout d'agent, ainsi que la méthode du
   * httpService soit bien une méthode 'POST' avec l'url définie en ressources correspondante.
   */
  it(`Retourne un Observable qui doit correspondre au données attendus après un ajout d'agent`, () => {
    service.ajouterAgent(agentAttendu).subscribe((agent) => {
      expect(agent).toEqual(agentAttendu);
    });
    const req = httpTestingController.expectOne(ressources.urlAgents);

    expect(req.request.method).toEqual('POST');
    req.flush(agentAttendu);
  });

  /**
   * Vérifie que le service renvoi bien un Observable d'Agent après une modification d'un agent, ainsi que la méthode du
   * httpService soit bien une méthode 'PUT' avec l'url définie en ressources correspondante.
   */
  it(`Retourne un Observable qui doit correspondre au données attendus après modification d'un agent`, () => {
    service.modifierAgent(agentAttendu).subscribe((agent) => {
      expect(agent).toEqual(agentAttendu);
    });
    const req = httpTestingController.expectOne(ressources.urlAgents + agentAttendu.idAgent);

    expect(req.request.method).toEqual('PUT');
    req.flush(agentAttendu);
  });

  /**
   * Vérifie que le service renvoi bien un Observable d'Agent après une requête d'un agent choisi, ainsi que la méthode du
   * httpService soit bien une méthode 'GET' avec l'url définie en ressources correspondante.
   */
  it(`Retourne un Observable qui doit correspondre au données attendus après obtention des détails d'un agent`, () => {
    service.getAgent(1).subscribe((agent) => {
      expect(agent).toEqual(agentAttendu);
    });
    const req = httpTestingController.expectOne(ressources.urlAgents + agentAttendu.idAgent);

    expect(req.request.method).toEqual('GET');
    req.flush(agentAttendu);
  });

  /**
   * Vérifier la recherche paginé avec critères de recherche
   */
  it(`Retourne un Observable qui doit correspondre au données attendus avec critères de recherches`, () => {
    // Given context: Mocké le service de recherche agents paginés
    service.getAgents(matPaginator, AgentSample.retourneAgent()).subscribe((results) => {
      expect(results).toEqual(AgentSample.getListAgentsPremierePage());
    });

    // When : appel au back avec l'url+ critères de recherches (code corps)
    const req = httpTestingController.expectOne(
      ressources.urlAgents +
        '?' +
        AgentSample.retourneUrlAvecCritereAgent(
          matPaginator.pageSize,
          matPaginator.pageIndex,
          AgentSample.retourneAgent()
        )
    );

    // Then : le résultat de pagination est retourné sans erreur
    expect(req.request.method).toEqual('GET');
    req.flush(AgentSample.getListAgentsPremierePage());

    // vérifions qu'il n'y a pas d'appels http en attente
    httpTestingController.verify();
  });

  /**
   * Vérifier la recherche paginé sans critères de recherche
   */
  it(`Retourne un Observable qui doit correspondre au données attendus sans critères de recherche`, () => {
    // Given context: Mocké le service de recherche agents paginés
    service.getAgents(matPaginator, null).subscribe((results) => {
      expect(results).toEqual(AgentSample.getListAgentsPremierePage());
    });

    // When : appel au back avec l'url+ critères de recherches (code corps)
    const req = httpTestingController.expectOne(
      ressources.urlAgents +
        '?' +
        AgentSample.retourneUrlAvecCritereAgent(matPaginator.pageSize, matPaginator.pageIndex, null)
    );

    // Then : le résultat de pagination est retourné sans erreur
    expect(req.request.method).toEqual('GET');
    req.flush(AgentSample.getListAgentsPremierePage());

    // vérifions qu'il n'y a pas d'appels http en attente
    httpTestingController.verify();
  });

  /** Vérifier la suppression d'un agent */
  it(`La suppression d'agent doit bien s'effectuer`, () => {
    // Given : Préparation de la suppression
    service.supprimerAgent(3).subscribe((data: any) => {
      expect(data).toBe(3);
    });
    // When: Appeler le service de suppression d'un agent de idAgent=3
    const req = httpTestingController.expectOne(ressources.urlAgents + 3);
    // Then: Vérifier si la méthode delete est appelée
    expect(req.request.method).toBe('DELETE');
    // Simuler l'appel serveur
    req.flush(3);
    // vérifions qu'il n'y a pas d'appels http en attente
    httpTestingController.verify();
  });

  /** Vérifier la suppression d'un agent sans fournir l'id */
  it(`La suppression d'agent renvoi une erreur si elle n'a pas d'Id Agent en paramètre`, () => {
    service.supprimerAgent(null).subscribe(
      (data) => {
        throwError(`Il ne doit pas y avoir de donnée. On a eu ceci : ` + data);
      },
      (err) => {
        expect(err).toBeInstanceOf(Error);
      }
    );
  });
});
