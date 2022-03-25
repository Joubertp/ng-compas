import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Ressources } from 'src/app/app.constants';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { InfoApplicationService } from './info-application.service';
import { InfoApplicationSample } from './initialiseurs-test/info-application.sample';

describe('InfoApplicationService', () => {
  let service: InfoApplicationService;
  let httpTestingController: HttpTestingController;
  let ressources: Ressources;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InfoApplicationService, Ressources, HttpErrorHandler, MessageService],
    });
    service = TestBed.inject(InfoApplicationService);
    httpTestingController = TestBed.inject(HttpTestingController);
    ressources = TestBed.inject(Ressources);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** Vérifier la recherche paginé avec critères de recherche */
  it(`Retourne un Observable qui doit correspondre aux données d'information de l'application`, () => {
    // Given context: Mocké le service d'information de l'application
    service.getInfoAppli().subscribe((results) => {
      expect(results).toEqual(InfoApplicationSample.retourneInfoApplication());
    });

    // When : appel au back avec l'url+
    const req = httpTestingController.expectOne(ressources.urlApplicationInformation);

    // Then : le résultat de pagination est retourné sans erreur
    expect(req.request.method).toEqual('GET');
    req.flush(InfoApplicationSample.retourneInfoApplication());
  });
});
