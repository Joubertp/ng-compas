import { Ressources } from '../../app.constants';
import { Role } from './role.model';

export class Utilisateur {
  constructor(
    public username: string,
    public idAgent: number,
    public numen: string,
    public nomUsage: string,
    public prenom: string,
    public email: string,
    public codeProfilApplicatif: string,
    public codeAcademiePerimetre: string,
    public role: Role
  ) {
    this.role = new Role(
      this.codeProfilApplicatif === Ressources.GESTION,
      this.codeProfilApplicatif === Ressources.CONSULTATION
    );
  }
}
