import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { PropiedadesService }  from '../../providers/propiedades.service';
import { UserService }         from '../../providers/user.service';

@Component({
  selector: 'app-select-precio',
  templateUrl: './select-precio.component.html',
  styleUrls: ['./select-precio.component.css']
})
export class SelectPrecioComponent implements OnInit {

  dataTarget = '';

  constructor(
    private prop:   PropiedadesService,
    private router: Router,
    private user:   UserService
  ) { }

  ngOnInit() {
    if (!this.user.permiso('new-prop')){
      this.dataTarget = '#loginModal';
    } else {
      this.dataTarget = '';
    }
  }

  siguiente(s){
    
  }

}
