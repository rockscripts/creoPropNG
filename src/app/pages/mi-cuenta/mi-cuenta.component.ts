import { Component, OnInit } from '@angular/core';

import { Busqueda }          from './../../models/busqueda';

import { UserService }       from './../../providers/user.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  
  public propietario_id: any;

  constructor(
  	private user: UserService
  ) { }

  ngOnInit() {
  	this.propietario_id = this.user.getId();
  }

}
