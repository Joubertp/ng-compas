import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: any;
  let app: any;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it(`L'application doit être crée`, () => {
    expect(app).toBeTruthy();
  });

  it(`Doit avoir le titre 'Application Blanche'`, () => {
    expect(app.title).toEqual('Application Blanche');
  });

  it('Le navigator interceptor est bien déclenché dans le constructeur', () => {
    expect(app).toBeTruthy();
  });

  it(`L'indicateur de chargement est activé au début de la navigation`, () => {
    const routerEvent = new NavigationStart(1, 'navStart');
    app.navigationInterceptor(routerEvent);
    expect(app.loading).toEqual(true);
  });

  it(`L'indicateur de chargement est désactivé à la fin de la navigation`, () => {
    const routerEvent = new NavigationEnd(1, 'navEnd', 'urlRedirect');
    app.navigationInterceptor(routerEvent);
    expect(app.loading).toEqual(false);
  });

  it(`L'indicateur de chargement est désactivé lorsque la navigation est annulé`, () => {
    const routerEvent = new NavigationCancel(1, 'navCancel', 'urlRedirect');
    app.navigationInterceptor(routerEvent);
    expect(app.loading).toEqual(false);
  });

  it(`L'indicateur de chargement est désactivé lorsque la navigation provoque une erreur`, () => {
    const routerEvent = new NavigationError(1, 'navCancel', 'urlRedirect');
    app.navigationInterceptor(routerEvent);
    expect(app.loading).toEqual(false);
  });
});
