import { TypePersonnel } from '../../models/typePersonnel.model';
import { Etablissement } from '../../models/etablissement.model';
import { CorpsPersonnel } from 'src/app/models/corpsPersonnel.model';
import { Departement } from 'src/app/models/departement.model';

/**
 * Class utilitaire permettant de générer des jeux de données pour les tests unitaires.
 */
export class NomenclatureSample {
  /**
   * Retourne une liste de type personnel de test.
   * @param nbType Nombre de type de Personnels dans la liste.
   */
  static retourneListeTypePersonnel(nbType: number): TypePersonnel[] {
    const listeTypePersonnel: TypePersonnel[] = [];

    for (let i = 0; i < nbType; i++) {
      const actualNbType = i.toString();
      const typePersonnelAttendu = new TypePersonnel(
        actualNbType,
        'testCorpsSierh' + actualNbType,
        'testCodeElement' + actualNbType,
        'testCodeCorpsSirhen' + actualNbType,
        'testCodeMinistere' + actualNbType,
        'testLibelleLong' + actualNbType,
        'testLibelleImpression' + actualNbType
      );
      listeTypePersonnel.push(typePersonnelAttendu);
    }

    return listeTypePersonnel;
  }

  /**
   * Retourne une liste d'Etablissements de test.
   * @param nbType Nombre d'Etablissements dans la liste.
   */
  static retourneListeEtablissement(nbType: number): Etablissement[] {
    const listeEtablissement: Etablissement[] = [];

    for (let i = 0; i < nbType; i++) {
      const actualNbEtablissement = i.toString();
      const etablissement = new Etablissement(
        'testCodeUsi' + actualNbEtablissement,
        'testLibelle' + actualNbEtablissement,
        'testLibelleImpression' + actualNbEtablissement
      );
      listeEtablissement.push(etablissement);
    }

    return listeEtablissement;
  }

  /**
   * Retourne une liste de corps personnel de test.
   * @param nbType Nombre de corps dans la liste.
   */
  static retourneListeCorpPersonnel(nbType: number): CorpsPersonnel[] {
    const listeCorp: CorpsPersonnel[] = [];

    for (let i = 0; i < nbType; i++) {
      const actualNbCorpPersonnel = i.toString();
      const corpsPersonnel = new CorpsPersonnel(
        actualNbCorpPersonnel,
        'testCodeElement' + actualNbCorpPersonnel,
        'testCodeCorpsSierh' + actualNbCorpPersonnel,
        'testcodeCorpsSirhen' + actualNbCorpPersonnel,
        'testCodeMinistere' + actualNbCorpPersonnel,
        'testlibelleLong' + actualNbCorpPersonnel,
        'testLibelleImpression' + actualNbCorpPersonnel
      );
      listeCorp.push(corpsPersonnel);
    }

    return listeCorp;
  }

  /**
   * Retourne une liste de département de test
   * @param nbType Nombre de corps dans la liste.
   */
  static retourneListeDepartement(nbType: number): Departement[] {
    const listeDepartement: Departement[] = [];

    for (let i = 0; i < nbType; i++) {
      const actualNbDepartement = i.toString();
      const departement = new Departement(
        actualNbDepartement,
        'testLibelleLong' + actualNbDepartement,
        'testLibelleCourt' + actualNbDepartement,
        'testLibelleImpression' + actualNbDepartement,
        'testCodePostal' + actualNbDepartement,
        'testCommine' + actualNbDepartement
      );
      listeDepartement.push(departement);
    }

    return listeDepartement;
  }
}
