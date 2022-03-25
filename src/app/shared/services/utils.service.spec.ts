import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Ressources } from 'src/app/app.constants';
// import { snackBarMessageComponent } from '../components/snack-bar-message.component';
import { ErrorHttpMessage } from '../utils/error-http-message';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  const errorObj = { error: { description: ErrorHttpMessage[0] } };

  const espionSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Ressources,
        { provide: MatSnackBar, useValue: espionSnackBar },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
      ],
    }).compileComponents();
    espionSnackBar.openFromComponent.and.returnValue(null);
    espionSnackBar.openFromComponent.calls.reset();
  }));

  beforeEach(() => {
    service = TestBed.inject(UtilsService);
  });

  it('Le service doit être crée', () => {
    expect(service).toBeTruthy();
  });

  it(`La méthode 'remplacerCaracteresEncodes' remplace bien les caractères`, () => {
    const result = service.remplacerCaracteresEncodes('Test \u2018 \u2019 \u201C \u201D');
    expect(result).toBeInstanceOf(String);
    expect(result).toEqual(`Test ' ' " "`);
  });

  it(`La méthode 'supprimerNulls' renvoi une liste sans Null et ignore l'élément si ce n'est pas un objet`, () => {
    const liste: any[] = [
      { id: 0 },
      { id: 1 },
      { id: null },
      { id: 3 },
      { id: null },
      4,
      { id: 5 },
    ];

    service.supprimerNulls(liste);
    expect(liste).toEqual([{ id: 0 }, { id: 1 }, { id: '' }, { id: 3 }, { id: '' }, 4, { id: 5 }]);
  });

  it(`La méthode gestionErreurHttp utilise bien le snackBarMessageComponent`, () => {
    service.gestionErreurHttp(errorObj);
    expect(espionSnackBar.openFromComponent).toHaveBeenCalled();
  });
});
