import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Busqueda }   from '../models/busqueda';
import { Propiedad }  from '../models/propiedad';

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
  private wscg = 'propiedad/caracteristicas';
  private wsam = 'ambientes/all';
  private wser = 'servicios/all';

  public busqueda = new Busqueda();
  private model   = new Propiedad();
  private caracGral:any = [];

  public modelVacio:boolean = true;

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) {
  }

  getModel(){
    return this.model;
  }

  setModel(m){
    this.model = m;
    this.modelVacio = false;
  }

  getSearch() {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsa,JSON.stringify(this.busqueda));
  }

  getEquipamiento() {
    return this.http.get(this.config.getAPIUrl()+this.wse);
  }

  getAmbientes() {
    return this.http.get(this.config.getAPIUrl()+this.wsam);
  }

  getServicios() {
    return this.http.get(this.config.getAPIUrl()+this.wser);
  }

  getCaraceristicas() { //[modificar] para no hacer peticiones de gusto
    return this.http.get(this.config.getAPIUrl()+this.wscg);
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
