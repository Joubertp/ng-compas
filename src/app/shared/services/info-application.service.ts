import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ressources } from 'src/app/app.constants';
import { InfoAppli } from '../models/infoAppli.model';
import { Observable } from 'rxjs';
import { HttpErrorHandler, HandleError } from 'src/app/shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class InfoApplicationService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private ressources: Ressources,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('InfoApplicationService');
  }

  /**
   * Fonction permettant de récupérer les informations de l'application venant du back-end
   */
  getInfoAppli(): Observable<InfoAppli> {
    return this.http.get<InfoAppli>(this.ressources.urlApplicationInformation);
  }
}
