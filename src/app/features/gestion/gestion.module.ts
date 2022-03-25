import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionRoutingModule } from "./gestion-routing.module";
import { GestionComponent } from './components/gestion/gestion.component'


@NgModule({
  declarations: [GestionComponent],
  imports: [
    CommonModule,
    SharedModule,
    GestionRoutingModule
  ]
})
export class GestionModule { }
