import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDossierAdministratifComponent } from './components/user-dossier-administratif/user-dossier-administratif.component';
import { ListInternComponent } from './components/list-intern/list-intern.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserDossierAdministratifComponent,
    ListInternComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class CoreModule { }
