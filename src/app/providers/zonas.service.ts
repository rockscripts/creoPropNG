import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private url = './creoPropAPI/web/';

  private wsp  = 'provincias/all';
  private wsl  = 'localidades/byProvince';
  private wsb  = 'barrios/byLocalidad';

  public termUbicacion: string;
  public provincia:     number;

  constructor(
    private http: HttpClient
  ) { }

  getLocalidades() {
    return this
            .http
            .post(this.url+this.wsl, {'id':this.provincia,'t':this.termUbicacion});
  }

  getProvincias() {
    return this
            .http
            .post(this.url+this.wsp,{});
  }

  getBarrios(i) {
    return this
            .http
            .post(this.url+this.wsb, {'id':1,'t':this.termUbicacion});
  }
}
