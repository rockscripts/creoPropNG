import { Component, OnInit } from '@angular/core';

import { UserService }  from './../../providers/user.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private us : UserService) {
   }

  registrado = false;

  enlaces:any=[
    { r: "select-plan", t: 'PUBLICAR UNA PROPIEDAD', attr:'' }
  ];

  ngOnInit() {
    this.us.onLogin.subscribe({
      next: (v) => {
        this.registrado = this.us.logeado();
      }
    });
  }


}
