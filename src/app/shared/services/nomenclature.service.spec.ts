import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NomenclatureService } from './nomenclature.service';
import { Ressources } from 'src/app/app.constants';
import { NomenclatureSample } from '../services/initialiseurs-test/nomenclature.sample';

describe('NomenclatureService', () => {
  let service: NomenclatureService;
  let httpTestingController: HttpTestingController;
  let ressources: Ressources;

  // Initialisation des listes de test.
  const listeTypePersonnel = NomenclatureSample.retourneListeTypePersonnel(3);
  const listeEtablissement = NomenclatureSample.retourneListeEtablissement(3);
  const listeDepartement = NomenclatureSample.retourneListeDepartement(3);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NomenclatureService, Ressources],
    });
    service = TestBed.inject(NomenclatureService);
    httpTestingController = TestBed.inject(HttpTestingController);
    ressources = TestBed.inject(Ressources);
  });

  it('Le composant doit être crée', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Vérifie que le service renvoi bien une liste d'Observable de TypePersonnel, ainsi que la méthode du
   * httpService soit bien une méthode 'GET' avec l'url définie en ressources correspondante.
   */
  it(`Retourne une liste d'Observable de TypePersonnel lors de la consultation des types personnels`, () => {
    service.recupererTypePersonnel().subscribe((listeType) => {
      expect(listeType).toEqual(listeTypePersonnel);
    });
    const req = httpTestingController.expectOne(ressources.urlNomenclatureTypePerso);

    expect(req.request.method).toEqual('GET');
    req.flush(listeTypePersonnel);
  });

  /**
   * Vérifie que le service renvoi bien une liste d'Observable de TypePersonnel, ainsi que la méthode du
   * httpService soit bien une méthode 'GET' avec l'url définie en ressources correspondante.
   */
  it(`Retourne une liste d'Observable de TypePersonnel lors de la consultation des types personnels par corps`, () => {
    const corpsSierh = 'testCorpsSierh';
    service.recupererTypePersonnelParCorps(corpsSierh).subscribe((listeType) => {
      expect(listeType).toEqual(listeTypePersonnel);
    });
    const req = httpTestingController.expectOne(
      ressources.urlNomenclatureCorps + '/' + corpsSierh + '/N_TYPE_PERSONNEL'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(listeTypePersonnel);
  });

  /**
   * Vérifie que le service renvoi bien une liste d'Observable de CorpsPersonnel, ainsi que la méthode du
   * httpService soit bien une méthode 'GET' avec l'url définie en ressources correspondante.
   */
  it(`Retourne une liste d'Observable de CorpsPersonnel lors de la consultation des corps personnels`, () => {
    const typePerso = '2';
    service.recupererCorpsPersonnel(typePerso).subscribe((listeType) => {
      expect(listeType).toEqual(listeTypePersonnel);
    });
    const req = httpTestingController.expectOne(
      ressources.urlNomenclatureTypePerso + '/' + typePerso + '/N_CORPS_FP'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(listeTypePersonnel);
  });

  /**
   * Vérifie que le service renvoi bien une liste d'Observable d'Etablissements', ainsi que la méthode du
   * httpService soit bien une méthode 'GET' avec l'url définie en ressources correspondante.
   */
  it(`Retourne une liste d'Observable d'Etablissement lors de la consultation de la liste des Etablissements`, () => {
    service.recupererEtablissement('codeDepartement').subscribe((liste) => {
      expect(liste).toEqual(listeEtablissement);
    });
    const req = httpTestingController.expectOne(ressources.urlEtablissement + 'codeDepartement');

    expect(req.request.method).toEqual('GET');
    req.flush(listeEtablissement);
  });

  /**
   * Vérifie que le service renvoi bien une liste d'Observable de département, ainsi que la méthode du
   * httpService soit bien une méthode 'GET' avec l'url définie en ressources correspondante.
   */
  it(`Retourne une liste d'Observable de département lors de la consultation de la liste des Départements`, () => {
    service.recupererDepartement().subscribe((liste) => {
      expect(liste).toEqual(listeDepartement);
    });
    const req = httpTestingController.expectOne(ressources.urlNomenclatureDepartement);

    expect(req.request.method).toEqual('GET');
    req.flush(listeDepartement);
  });
});
