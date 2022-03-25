import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ng-compas-table',
  templateUrl: './ng-compas-table.component.html',
  styleUrls: ['./ng-compas-table.component.css']
})
export class NgCompasTableComponent implements OnInit {

  @Input() liste: Array<Object>;
  displayedColumns: Array<String>

  constructor(private readonly router: Router) {

  }

  ngOnInit(): void {
    console.log("ngOnInit app-ng-compas-table")
    console.log("this.liste",this.liste)
    if (!this.liste[0]) {
      console.warn("Le tableau est vide")
    } else {
      this.displayedColumns = this.getColumns(this.liste[0])
      console.log("this.displayedColumns",this.displayedColumns)
    }
  }

  getColumns = (line) => Object.keys(line);


  clickCase(tabCase){
    if(tabCase.link){
      this.router.navigateByUrl("/agent/agents/detail/**");
    }
  }

}
