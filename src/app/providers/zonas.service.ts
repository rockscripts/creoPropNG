import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';

import { BuscarZona } from '../models/buscar-zona';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  private wsaf  = 'zonas/all';
  private wson  = 'zonas/create';

  private model:BuscarZona = new BuscarZona();

  public MAX_LEVELS = 5;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  getZonas() { return this.http.post(this.config.getAPIUrl()+this.wsaf, this.model);  }

  setBusqueda(m) { this.model.nivel = m.nivel;  this.model.root = m.root;  }
  getModelBusqueda()  { return this.model; }
}
