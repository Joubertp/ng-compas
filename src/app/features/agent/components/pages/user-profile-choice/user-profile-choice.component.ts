import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile-choice',
  templateUrl: './user-profile-choice.component.html',
  styleUrls: ['./user-profile-choice.component.css']
})
export class UserProfileChoiceComponent implements OnInit {

  listProfiles = undefined

  constructor() {
    const user = UserService.getUser()
    this.listProfiles = user.listProfiles

   }

  ngOnInit(): void {
  }

}
