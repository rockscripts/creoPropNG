import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Busqueda }   from '../models/busqueda';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  private url = './creoPropAPI/web/';
  private wsa  = 'location/search';
  private wsp  = 'propiedad/getInfo';
  private wsn  = 'propiedad/create';
  private wsc  = 'search/config';
  private wse  = 'equipamientos/all';

  public busqueda = new Busqueda();

  constructor(
    private http: HttpClient
  ) { }

  getSearch() {
    return this
            .http
            .post(this.url+this.wsa,JSON.stringify(this.busqueda));
  }

  getEquipamiento() {
    return this
            .http
            .get(this.url+this.wse);
  }

  getPropiedad(id) {
    return this
            .http
            .post(this.url+this.wsp, {'id':id});
  }

  getSearchConfig() {
    return this
            .http
            .post(this.url+this.wsc, JSON.stringify(this.busqueda));
  }

  create(m) {
    return this
            .http
            .post(this.url+this.wsn, m);
  }

  clearParams(){
    this.busqueda = new Busqueda();
  }
}
