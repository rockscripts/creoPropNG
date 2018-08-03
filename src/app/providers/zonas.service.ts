import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService }        from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  private wsp  = 'provincias/all';
  private wsl  = 'localidades/byProvince';
  private wsb  = 'barrios/byLocalidad';

  public termUbicacion: string;
  public provincia:     number;

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  getLocalidades() {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsl, {'id':this.provincia,'t':this.termUbicacion});
  }

  getProvincias() {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsp,{});
  }

  getBarrios(i) {
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsb, {'id':1,'t':this.termUbicacion});
  }
}
