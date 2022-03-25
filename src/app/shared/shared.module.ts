import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SnackBarMessageComponent } from './components/snack-bar-message/snack-bar-message.component';
import { CustomPaginator } from './utils/custom-paginator';
import { UtilsService } from './services/utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { NgCompasTableComponent } from './components/ng-compas-table/ng-compas-table.component';

@NgModule({
  imports: [SharedModule.MODULE_LIST],
  exports: [SharedModule.MODULE_LIST, NgCompasTableComponent],
  providers: [
    AuthGuard,
    UtilsService,
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    PageNotFoundComponent,
    SnackBarMessageComponent,
    ConfirmationModalComponent,
    NgCompasTableComponent
  ],
})
export class SharedModule {
  static readonly MODULE_LIST = [
    CommonModule,
    FontAwesomeModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatTooltipModule,
    MatSortModule,
    MatSnackBarModule,
    MatMenuModule,
  ];
}
