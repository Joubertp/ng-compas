import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-stagiaires',
  templateUrl: './list-stagiaires.component.html',
  styleUrls: ['./list-stagiaires.component.css']
})
export class ListStagiairesComponent implements OnInit {


  listInter = [
    {
      nom: "CLONE",
      prenom: "PNJ1",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ2",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ3",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ4",
      modeAcces: "CONC EXT",
      formation: "",
      site: "site de TOULOUSE",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ5",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ6",
      modeAcces: "CONC EXT",
      formation: "Doctorat en Biologie",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ7",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ8",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ9",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "MLPR 5 année spécial",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    },
    {
      nom: "CLONE",
      prenom: "PNJ10",
      modeAcces: "CONC EXT",
      formation: "",
      site: "",
      parcours: "",
      grade: "PLP CN",
      affectation: "Lycée Jolimont",
    }
  ]

  displayedColumns = ["stagiaires", "modeAcces", "formation", "site", "parcours", "grade", "affectation"];


  constructor() { }

  ngOnInit(): void {
  }

}
