import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from './snack-bar-message.component';

describe('SnackBarMessageComponent', () => {
  let component: SnackBarMessageComponent;
  let fixture: ComponentFixture<SnackBarMessageComponent>;

  const espionSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarMessageComponent],
      providers: [
        { provide: MatSnackBar, useValue: espionSnackBar },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    espionSnackBar.openFromComponent.and.returnValue(null);
    fixture = TestBed.createComponent(SnackBarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    espionSnackBar.openFromComponent.calls.reset();
  });

  it('Le composant doit être crée', () => {
    expect(component).toBeTruthy();
  });

  it('La méhode getIcon() renvoi les bonnes icones', () => {
    component.data.snackType = 'Success';
    expect(component.getIcon).toEqual('done');
    component.data.snackType = 'Error';
    expect(component.getIcon).toEqual('error');
    component.data.snackType = 'Warn';
    expect(component.getIcon).toEqual('warning');
    component.data.snackType = 'Info';
    expect(component.getIcon).toEqual('info');
  });

  it('La méthode warning est bien déclenchée', () => {
    component.warning('Message de warning');
    expect(espionSnackBar.openFromComponent).toHaveBeenCalledTimes(1);
  });

  it('La méthode info est bien déclenchée', () => {
    component.info(`Message d'info`);
    expect(espionSnackBar.openFromComponent).toHaveBeenCalledTimes(1);
  });
});
