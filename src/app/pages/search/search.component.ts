import { Component, OnInit } from '@angular/core';

import { Busqueda }           from './../../models/busqueda';
import { PropiedadesService } from './../../providers/propiedades.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  busqueda:Busqueda;

  constructor(
  	private propiedades:PropiedadesService
  ) { }

  ngOnInit() {
  	this.busqueda = this.propiedades.busqueda;
  }

}
