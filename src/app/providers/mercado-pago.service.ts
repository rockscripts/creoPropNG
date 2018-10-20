import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(
  	private http:   HttpClient,
    private config: ConfigService
  ) { }
}
