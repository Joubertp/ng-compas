import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static listProfiles = [
    { name: "ADMINISTRATEUR PORTAIL", desc: "Profil administrateur", },
    { name: "ADMINISTRATEUR ACADÉMIQUE", desc: "Profil administrateur academique", },
    { name: "GESTIONNAIRE ACADÉMIQUE", desc: "Profil gestionnaire academique" }
  ]
  private static user = {
    nom: "LEVENTREURE",
    prenom: "Jack",
    numen: "16F212E832BEV",
    academie: "TOULOUSE",
    corps: "PLP CN Grads: PLPN",
    modeAcceesConcour: "CONC",
    discipline: " GENIE ELECTRIQUE",
    dateEntreGrade: "01/09/2021",
    dateTitularisation: "",
    positionGestion: "C101",
    nomPatronymique: "ARABSA",
    email: "leventreure.Jack@gmail.com",
    phoneFix: "0529129891",
    phonePortable: "0638939121",
    adresse: "2 rue de la grotte",
    codePostale: "31500",
    ville: "TOULOUSE",

    listProfiles: UserService.listProfiles

  }

  constructor() { }

  static getUser(): any {
    return this.user;
  }
}
