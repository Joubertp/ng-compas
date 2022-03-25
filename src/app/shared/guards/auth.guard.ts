import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';
import { ErrorHttpMessage } from '../utils/error-http-message';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly utilService: UtilsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      //TODO enlever cette ligne quand on gérera corectement l'autentification
      resolve(true);
      // On bloque l'activation du composant si une erreur a lieu lors de l'authentification
      // On vérifie que l'utilisateur existe, et lorsque c'est le cas on vérifie que son profil
      // applicatif correspond à ceux attendus
    });
  }
}
