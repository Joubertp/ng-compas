import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-accueil-gestion',
  templateUrl: './accueil-gestion.component.html',
  styleUrls: ['./accueil-gestion.component.css']
})
export class AccueilGestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columns = [
    { columnDef: 'typeDepot',  header: 'Type(s) de dépôts', cell: (element) => `${element.typeDepot}` },
    { columnDef: 'nbrFait', header: 'a été fait', cell: (element) => `${element.nbrFait}` },
    { columnDef: 'nbrBrouillon', header: 'est en brouillon	', cell: (element) => `${element.nbrBrouillon}` },
    { columnDef: 'nbrAFaire', header: 'est à faire', cell: (element) => `${element.nbrAFaire}` }
  ];
  dataSource = [
    { typeDepot: "Avis du chef d'établissement", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
    { typeDepot: "Avis entretien pro RESERVE", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
    { typeDepot: "Avis du directeur de l'organisme de formation	", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
    { typeDepot: "Avis de l'inspecteur	", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
    { typeDepot: "Rapport tuteur académique", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
    { typeDepot: "Entretien professionnel lauréats 2020	", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
    { typeDepot: "Rapport d'inspection", nbrFait: 0, nbrBrouillon: 0, nbrAFaire: 257 },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
}
