import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Busqueda }   from '../models/busqueda';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  private wsa  = 'location/search';
  private wsp  = 'propiedad/getInfo';
  private wsn  = 'propiedad/create';
  private wsc  = 'search/config';
  private wse  = 'equipamientos/all';

  public busqueda = new Busqueda();
  public model;

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  getSearch() {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsa,JSON.stringify(this.busqueda));
  }

  getEquipamiento() {
    return this
            .http
            .get(this.config.getAPIUrl()+this.wse);
  }

  getPropiedad(id) {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsp, {'id':id});
  }

  getSearchConfig() {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsc, JSON.stringify(this.busqueda));
  }

  create() {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsn, this.model);
  }

  clearParams(){
    this.busqueda = new Busqueda();
  }
}
