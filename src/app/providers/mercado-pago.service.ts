import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

import { ConfigService } from './config.service';

import { Pago }        from './../models/pago';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(
  	private http:   HttpClient,
    private config: ConfigService
  ) { }

  private urlCompra = 'pago/nuevo';

  public pago = new Pago();
  public onPreferenceCreated = new Subject(); // [Modificar] ahora no se usa luego hacerlo reactivo

  comprar(s,u){
  	this.pago = new Pago();
  	this.pago.idItem = s;
  	this.pago.idUser = u;
  	return this.http.post(this.config.getAPIUrl()+this.urlCompra, this.pago);
  }
}
