import { Injectable } from '@angular/core';
@Injectable()
export class MessagesIHM {
  public static nomAppli = 'AppliBlanche';
  // Accueil
  public static bienvenue = `Bienvenue sur l'Application Blanche`;

  // Bandeau
  public static roleGestion = 'Gestionnaire';
  public static roleConsult = 'Consultation';

  // Navigation
  public static accueil = 'Accueil';
  public static agents = 'MES AGENTS';
  public static rechercheAgent = 'Rechercher un agent';
  public static creerAgent = 'Créer un agent';
  public static consulterAgent = 'Consulter un agent';
  public static compte = 'Mon compte (Bientôt disponible !)';

  // Page rechercher agent
  public static btnRecherche = 'Rechercher';
  public static btnReinitialiser = 'Réinitialiser';

  // Page liste agent
  public static listeAgent = 'Liste des agents';
  public static resultatVide = `Aucun résultat n'a pu être trouvé avec ces critères`;
  public static idAgentIncorrect = `L'identifiant de l'agent est inccorrect. `;
  public static titreSupprimer = 'Supprimer';
  public static btnConsulterAgent = `Consulter l'agent`;
  public static btnEditerAgent = `Éditer l'agent`;
  public static btnSupprimerAgent = `Supprimer l'agent`;
  public static btnPlusCriteres = `Plus de crièteres`;
  public static btnMoinsCriteres = `Moins de critères`;

  // Page edition agent

  public static modifAgent = `Modification d'un agent`;

  public static identite = 'Identité';
  public static affectation = 'Affectation';
  public static invalide = 'invalide';
  public static incorrect = 'incorrect';
  public static obligatoire = 'obligatoire';
  public static selectDepartement = 'Selectionnez un département';
  public static selectTypePerso = 'Selectionnez un type de personnel';
  public static chargement = 'Chargement...';
  public static btnAnnuler = 'Annuler';

  // Libelle agent
  public static nom = 'Nom';
  public static prenom = 'Prénom';
  public static numen = 'Numen';
  public static etablissement = 'Établissement';
  public static corps = 'Corps';
  public static codeEtablissement = 'Code établissement';
  public static codeCorps = 'Code corps';

  public static eMail = 'E-mail';
  public static typePersonnel = 'Type de personnel';
  public static departement = 'Département';
}
