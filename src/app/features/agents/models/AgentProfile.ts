
export class AgentProfile {
    id: String
    agent: {
        id: String
        numen: String
        grade: {
            id: String
            libelle: String
            libelleLong: String
        }
        discipline: {
            id: String
            libelle: String
            libelleLong: String
        }
        nom: String
        nomUsage: String
        prenom: String
        courriel: String
        civilite: String
        telephonePrincipal: String
        telephoneSecondaire: String
        dateConnexion: String
        nombreConnexion: Number
        source: String
        identifiantSiiprien: String
        password: String
        charte: String
        etablissement: {
            id: String
            typeEtablissement: {
                id: String
                libelle: String
                libelleCourt: String
            }
            academie: {
                id: String
                libelle: String
                urlAssistance: String
                utilise: boolean
                urlSiiprien: String
            }
            bassin: String
            secteur: String
            circonscription: {
                id: String
                libelle: String
            }
            rep: String
            degre: String
            libelle: String
            libelleComplementaire: String
            libelleOfficiel: String
            adresse: String
            adresse2: String
            codePostal: String
            telephone: String
            fax: String
            courriel: String
            chefEtablissement: String
            courrielChefEtablissement: String
            adjoint: String
            courrielAdjoint: String
            source: String
            inscription: String
            synchronise: true
            inscriptionHorsZone: String
            inscriptionSite: String
            commune: {
                id: String
                libelle: String
                departementId: String
                academieId: {
                    id: String
                    libelle: String
                    urlAssistance: String
                    utilise: true
                    urlSiiprien: String
                }
            }
            statut: 0
            notification: String
        }
        profil: {
            id: String
            academie: {
                id: String
                libelle: String
                urlAssistance: String
                utilise: true
                urlSiiprien: String
            }
            code: String
            libelle: String
            description: String
            visibiliteAcademique: true
            visibiliteCirconscription: true
            visibiliteDiscipline: true
            visibiliteDepartementale: true
            visibiliteAffectation: true
            visibiliteEspe: true
            visibiliteParcours: true
            visibilitePortail: true
            visibiliteLien: true
            visibiliteJury: true
            lien: true
            secteurs: String
            lienBerceau: true
            signalement: true
        }
        dateDebut: String
        dateFin: String
        qualite: String
    }
    disciplines: {
        Discipline: {
            id: String
            libelle: String
            libelleLong: String
        }
    }
    etablissements: String
    parcours: String
    jurys: String
    departements: String
    circonscriptions: String


    constructor(){
        
    }
}

