import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Ressources {
  // Profils
  public static GESTION = 'ApbGestion';
  public static CONSULTATION = 'ApbConsultation';

  public urlBackEnd = environment.urlBackEnd;

  // URL d'accès au service Agent
  public urlAgents = this.urlBackEnd + '/agents/';

  // URL d'accès au service Agent
  public urlAgentsData = this.urlBackEnd + '/agents/data';

  // URL d'accès au service referentiel
  public urlEtablissement = this.urlBackEnd + '/referentiel/etablissements/';

  // Url d'accès à la nomenclature


  // URL d'accès au service AppliBlancheInformationService
  public urlApplicationInformation = this.urlBackEnd + '/info';
}

