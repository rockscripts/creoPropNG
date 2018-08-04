import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Busqueda }   from '../models/busqueda';

<<<<<<< HEAD
import { ConfigService } from './config.service';
=======
import { ConfigService }        from './config.service';
>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a

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

  constructor(
<<<<<<< HEAD
    private http: HttpClient,
=======
    private http:   HttpClient,
>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a
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

  create(m) {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsn, m);
  }

  clearParams(){
    this.busqueda = new Busqueda();
  }
}
