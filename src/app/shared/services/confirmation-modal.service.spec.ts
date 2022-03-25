import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfirmationModalService } from './confirmation-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

describe('ConfirmationModalService', () => {
  let service: ConfirmationModalService;
  let httpTestingController: HttpTestingController;
  const espionMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfirmationModalService,
        { provide: MatDialog, useValue: espionMatDialog },
        Overlay,
      ],
    });
    service = TestBed.inject(ConfirmationModalService);
    httpTestingController = TestBed.inject(HttpTestingController);
    espionMatDialog.open.calls.reset();
  });

  it('Le composant doit être crée', () => {
    expect(service).toBeTruthy();
  });

  it(`La méthode confirmer action déclenche bien le composant MatDialog`, () => {
    service.confirmerAction(
      'TitreTest',
      'ContentTest',
      'IconTest',
      () => {},
      'MessageNonTest',
      'MessageOkTest'
    );
    expect(espionMatDialog.open).toHaveBeenCalled();
  });
});
