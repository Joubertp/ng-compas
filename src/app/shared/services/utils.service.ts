import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ressources } from 'src/app/app.constants';
import { ErrorHttpMessage } from '../utils/error-http-message';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from '../components/snack-bar-message/snack-bar-message.component';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  version: string;
  snackbarConfig: MatSnackBarConfig;
  snackBar: SnackBarMessageComponent;

  constructor(
    private readonly http: HttpClient,
    private readonly ressources: Ressources,
    private readonly snackBarMat: MatSnackBar
  ) {
    this.snackBar = new SnackBarMessageComponent(snackBarMat, MAT_SNACK_BAR_DATA);
  }

  /**
   * Méthode permettant de transformer toutes les valeurs null d'un array en chaîne vide
   *
   * @param arr : tableau d'objets
   * @returns Array<any>
   */
  supprimerNulls(arr: Array<object>): Array<any> {
    for (const obj of arr) {
      if (typeof obj !== 'object') {
        continue;
      }

      for (const k in obj) {
        if (!obj.hasOwnProperty(k)) {
          continue;
        }

        const v = obj[k];

        if (v === null || v === undefined) {
          obj[k] = '';
        }
      }
    }
    return arr;
  }

  /**
   * Méthode permettant de modifier tous les caractères "spéciaux" issus de Word ou autre logiciel
   *
   * @param arr : string
   * @returns string
   */
  remplacerCaracteresEncodes(arr: string): string {
    const correction = arr.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
    return correction;
  }

  /**
   * Méthode permettant la gestion d'erreur http à travers la popup snack.
   * Si le code d'erreur n'a pas de correspondance avec un message, un message par défaut
   * est utilisé.
   *
   * @param error : erreur à afficher.
   */
  gestionErreurHttp(error: any): void {
    this.snackBar.error(
      `${error?.status?.toString() ? error.status.toString() : 0} ${
        ErrorHttpMessage[error?.status] ? ErrorHttpMessage[error.status] : ErrorHttpMessage[0]
      }`
    );
  }
}
