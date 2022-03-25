import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Utilisateur } from 'src/app/shared/models/utilisateur.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessagesIHM } from 'src/app/shared/messages-ihm.constants';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.css'],
})
export class BandeauComponent implements OnInit {
  user: Utilisateur;

  @Output() public sidenavToggle = new EventEmitter();

  messageIhm = MessagesIHM;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  lastTriggeredMenu: any

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {

  }

  public openCloseSidenav(): void {
    this.sidenavToggle.emit();
  }

  deconnexion(): void {
  }

  eventMouseover(){
    console.log("mouseover")
  }

  eventMouseoverMenu(menuTrigger): void {
    console.log("Event mouseover", menuTrigger)
    menuTrigger.openMenu()
    if(this.lastTriggeredMenu !== undefined) this.lastTriggeredMenu.closeMenu()
    this.lastTriggeredMenu = menuTrigger
  }
}
