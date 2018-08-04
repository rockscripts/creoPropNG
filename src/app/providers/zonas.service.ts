import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

<<<<<<< HEAD

import { ConfigService } from './config.service';
=======
import { ConfigService }        from './config.service';
>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a

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
<<<<<<< HEAD
    private http: HttpClient,
=======
    private http:   HttpClient,
>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a
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
