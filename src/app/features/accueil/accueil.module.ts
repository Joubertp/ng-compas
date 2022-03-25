import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AccueilRoutingModule } from './accueil-routing.module';



@NgModule({
  declarations: [AccueilComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccueilRoutingModule
  ]
})
export class AccueilModule { }
