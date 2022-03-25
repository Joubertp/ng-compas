import { Injectable, Inject } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ressources } from '../../app.constants';
import { DOCUMENT } from '@angular/common';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(
  ) {}

}
