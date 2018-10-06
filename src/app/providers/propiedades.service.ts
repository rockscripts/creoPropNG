import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Subject }         from 'rxjs/Subject';

import { Busqueda }   from '../models/busqueda';
import { Propiedad }  from '../models/propiedad';

import { ConfigService } from './config.service';
import { UserService }   from './user.service';

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

  public propiedadLoaded = new Subject<Propiedad>();

  constructor(
    private http:   HttpClient,
    private config: ConfigService,
    private user:   UserService
  ) {
  }

  getModel(){
    return this.model;
  }

  clearModel(){
    this.model = new Propiedad();
  }

  setModel(m){
    this.model = m;
    this.modelVacio = false;
  }

  getSearch() {
    return this.http.post(this.config.getAPIUrl()+this.wsa,JSON.stringify(this.busqueda));
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
    this.http.post(this.config.getAPIUrl()+this.wsp, {'id':id}).subscribe((r) => {
      this.model.amenities           = r['data'].amenities;
      this.model.servicios           = r['data'].servicios;
      this.model.ambientes           = r['data'].ambientes;
      this.model.inmobiliaria        = r['data'].inmobiliaria;
      this.model.carac_gral          = r['data'].carac_gral;
      this.model.files               = r['data'].files;
      this.model.cochera             = r['data'][0].cochera;
      this.model.user                = r['data'][0].user;
      this.model.ambientes_c         = r['data'][0].ambientes;
      this.model.banios              = r['data'][0].banios;
      this.model.precio              = r['data'][0].precio;
      this.model.superficie_cubierta = r['data'][0].superficie_cubierta;
      this.model.moneda_simbolo      = r['data'][0].moneda_simbolo;
      this.model.nombre_operacion    = r['data'][0].nombre_operacion;
      this.model.texto               = r['data'][0].texto;
      this.model.direccion           = r['data'][0].direccion;
      this.model.nombre_zona         = r['data'][0].nombre_zona;
      this.model.latitud             = Number(r['data'][0].latitud);
      this.model.longitud            = Number(r['data'][0].longitud);
      this.propiedadLoaded.next(this.model);
    });
  }

  getSearchConfig() {
    return this.http.post(this.config.getAPIUrl()+this.wsc, JSON.stringify(this.busqueda));
  }

  create() {
    this.model.propietario_id  = this.user.getId();
    this.model.inmobiliaria_id = this.user.getIdInmobiliaria();
    return this.http.post(this.config.getAPIUrl()+this.wsn, this.model);
  }

  clearParams(){
    this.busqueda = new Busqueda();
  }
}
