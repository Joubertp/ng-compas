import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  const espionMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: espionMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    espionMatDialogRef.close.and.returnValue(true);
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    espionMatDialogRef.close.calls.reset();
  });

  it('Doit être crée', () => {
    expect(component).toBeTruthy();
  });

  it(`L'action du bouton de confirmation se déclenche bien`, () => {
    component.data.ouiFn = () => {
      return true;
    };
    expect(component.data.ouiFn()).toBeTrue();
    component.onYesClick();
    expect(espionMatDialogRef.close).toHaveBeenCalledTimes(1);
  });

  it(`L'action du bouton d'annulation se déclenche bien`, () => {
    component.onNoClick();
    expect(espionMatDialogRef.close).toHaveBeenCalledTimes(1);
  });
});
