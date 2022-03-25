import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Ressources } from 'src/app/app.constants';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AccueilComponent } from './components/accueil/accueil.component';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsRoutingModule { }
