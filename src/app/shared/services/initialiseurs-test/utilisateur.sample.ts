import { Ressources } from 'src/app/app.constants';
import { Utilisateur } from 'src/app/models/utilisateur.model';

/**
 * Class utilitaire permettant de générer des jeux de données pour les tests unitaires.
 */
export class UtilisateurSample {
  /**
   * Retourne un utilisateur de test avec tous les attributs initialisés.
   */
  static retournerUtilisateur(codeProfilApplicatif: string): Utilisateur {
    return new Utilisateur(
      'usernameTest',
      1,
      'numenTest',
      'nomUsageTest',
      'prenomTest',
      'emailTest',
      codeProfilApplicatif,
      'codeAcademiePerimetreTest',
      null
    );
  }
}
