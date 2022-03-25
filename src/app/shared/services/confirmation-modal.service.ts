import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationModalService {
  constructor(private readonly dialog: MatDialog) {}
  /** Méthode qui permet de confirmer une action */
  confirmerAction(
    pTitle: string,
    pContent: string,
    pIcon: string,
    pOuiFn: () => void,
    pMessageNon: string,
    pMessageOk: string
  ): void {
    const matDialog = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: pTitle,
        message: pContent,
        icon: pIcon,
        ouiFn: pOuiFn,
        messageNon: pMessageNon,
        messageOk: pMessageOk,
      },
    });
  }
}
