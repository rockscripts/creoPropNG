import { Component, OnInit } from '@angular/core';

import { UserService }  from './../../providers/user.service';
import { Router, RouterEvent }       from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(
    private us:     UserService,
    private router: Router
  ){}

  registrado = false;
  navbar_red = true;

  enlaces:any=[
    { r: "select-plan", t: 'PUBLICAR UNA PROPIEDAD', attr:'' }
  ];

  ngOnInit() {
    this.us.onLogin.subscribe({
      next: (v) => {
        this.registrado = this.us.logeado();
      }
    });

    this.router.events.subscribe((e) => {
      if(e instanceof RouterEvent){
        if (e.url == '/select-plan'){
          this.navbar_red = false;
        } else {
          this.navbar_red = true;
        }
      }
    });
  }


}
