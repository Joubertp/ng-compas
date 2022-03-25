import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ressources } from 'src/app/app.constants';
import { CorpsPersonnel } from '../models/corpsPersonnel.model';
import { TypePersonnel } from '../models/typePersonnel.model';
import { Etablissement } from '../models/etablissement.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement.model';

@Injectable({
  providedIn: 'root',
})
export class NomenclatureService {
  constructor(private http: HttpClient, private ressources: Ressources) {}

}
