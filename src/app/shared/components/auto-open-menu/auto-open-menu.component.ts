import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-open-menu',
  templateUrl: './auto-open-menu.component.html',
  styleUrls: ['./auto-open-menu.component.css']
})

/**
 * Composant permettent de créer un menu déroulant.
 * 
 *  @trigger l'attribue de la balise servant de titre à notre dropdown
 *  @content l'attribue de la balise contenant le contenenu de notre dropdown
 * 
 * le code vient de stackoverflow :
 * https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover
 */
export class AutoOpenMenuComponent {

  timedOutCloser;

  constructor() { }

  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }

}
