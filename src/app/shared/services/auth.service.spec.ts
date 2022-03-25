import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Ressources } from 'src/app/app.constants';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UtilisateurSample } from './initialiseurs-test/utilisateur.sample';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let ressources: Ressources;
  const utilisateurCourant = UtilisateurSample.retournerUtilisateur(Ressources.GESTION);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Ressources,
        { provide: DOCUMENT, useValue: { location: { href: '' } } },
        { provide: Router, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
      ],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    ressources = TestBed.inject(Ressources);
  });

  /**
   * Vérifie que le service s'initialise correctement à travers le constructeur.
   */
  it('Le composant doit être crée', () => {
    expect(service).toBeTruthy();
  });

  it(`La méthode login initialise bien l'utilisateur courant`, () => {
    service.login();
    service.currentUserSubject.subscribe((res) => {
      expect(res).toEqual(utilisateurCourant);
    });
    const req = httpTestingController.expectOne(ressources.utilisateurConnecte);
    expect(req.request.method).toEqual('GET');
    req.flush(utilisateurCourant);
  });

  it(`La méthode logout réinitialise bien l'utilisateur courant`, () => {
    service.login().then(() => {
      service.currentUserSubject.subscribe((res) => {
        expect(res).toBeNull();
      });
      service.logout();
    });
    const req = httpTestingController.expectOne(ressources.utilisateurConnecte);
    expect(req.request.method).toEqual('GET');
    req.flush(utilisateurCourant);
  });
});
