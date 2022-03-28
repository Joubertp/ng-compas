import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ressources } from './app.constants';
import { AuthFormComponent } from './features/auth/components/auth-form/auth-form.component';
import { PageNotFoundComponent } from './shared/components/errors/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ListInternComponent } from './core/components/list-intern/list-intern.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: AccueilComponent,
  //   data: {
  //     profilsAutorises: [Ressources.GESTION, Ressources.CONSULTATION],
  //   },
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'accueil',
  //       component: AccueilComponent,
  //     },
  //   ],
  // },
  {
    path: 'auth', component: AuthFormComponent
  }, {
    path: 'listIntern', component: ListInternComponent
  }, {
    path: 'accueil',
    loadChildren: () => import('./features/accueil/accueil.module').then((m) => m.AccueilModule),
    data: { profilsAutorises: [Ressources.GESTION, Ressources.CONSULTATION], },
    canActivate: [AuthGuard],
  }, {
    path: 'agent',
    loadChildren: () => import('./features/agent/agent.module').then((m) => m.AgentModule),
    data: { profilsAutorises: [Ressources.GESTION, Ressources.CONSULTATION], },
    canActivate: [AuthGuard],
  }, {
  //   path: 'gestion',
  //   loadChildren: () => import('./features/gestion/gestion.module').then((m) => m.GestionModule),
  //   data: { profilsAutorises: [Ressources.GESTION, Ressources.CONSULTATION], },
  //   canActivate: [AuthGuard],
  // }, {
    path: '**',
    component: PageNotFoundComponent,
    data: { profilsAutorises: [Ressources.GESTION, Ressources.CONSULTATION], },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
