import { Component, OnInit } from '@angular/core';
import {UserService} from './../../providers/user.service';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private us : UserService) {
   }

  registrado = true;

  enlaces:any=[
    { r: "new-prop", t: 'PUBLICAR UNA PROPIEDAD', attr:'' }
  ];

  ngOnInit() {
      this.registrado = this.us.logeado();
      
  }


}
