import { InfoAppli } from '../../models/infoAppli.model';

/**
 * Class utilitaire permettant de générer des jeux de données pour les tests unitaires.
 */
export class InfoApplicationSample {
  /**
   * Retourne un infoAppli de test avec tous les attributs initialisés.
   */
  static retourneInfoApplication(): InfoAppli {
    return new InfoAppli(
      'nomApplication',
      'versionApplication',
      'timeApplication',
      'groupApplication',
      'artifactApplication');
  }
}
