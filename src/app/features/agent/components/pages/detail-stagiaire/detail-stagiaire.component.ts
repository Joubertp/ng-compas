import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-detail-stagiaire',
  templateUrl: './detail-stagiaire.component.html',
  styleUrls: ['./detail-stagiaire.component.css']
})
export class DetailStagiaireComponent implements OnInit {

  user = UserService.getUser()

  constructor() { }

  ngOnInit(): void {
  }

}
