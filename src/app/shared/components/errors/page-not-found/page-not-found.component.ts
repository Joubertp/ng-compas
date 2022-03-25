import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesIHM } from '../../../messages-ihm.constants';
import { UtilsService } from '../../../services/utils.service';

/**
 * Composant utilisé pour avertir d'une erreur 404, tout en redirigeant vers la page d'accueil.
 */
@Component({
  selector: 'app-page-not-found',
  template: '',
  styles: [],
})
export class PageNotFoundComponent {
  constructor(private readonly router: Router, private readonly utilService: UtilsService) {
    utilService.gestionErreurHttp({ status: 404 });
    this.router.navigateByUrl('');
  }
}
