import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { Busqueda } from '../models/busqueda';
import { Propiedad } from '../models/propiedad';

import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  private wsa = 'location/search';
  private wsp = 'propiedad/getInfo';
  private wsn = 'propiedad/create';
  private wsed = 'propiedad/edit';

  private wsc = 'search/config';

  private wse = 'equipamientos/all';
  private wscg = 'propiedad/caracteristicas';
  private wsam = 'ambientes/all';
  private wser = 'servicios/all';
  private wtpr = 'tipos-propiedad/all';

  private cpr = 'propiedad/count';

  public busqueda = new Busqueda();
  private model = new Propiedad();
  private caracGral: any = [];

  public modelVacio: boolean = true;

  public propiedadLoaded = new Subject<Propiedad>();
  public selectedCityName = 'Vilnius';

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private user: UserService
  ) {
  }

  getCountsPropiedades(id) {
    return this.http.post(this.config.getAPIUrl() + this.cpr, { 'id': id });
  }

  getModel() {
    return this.model;
  }

  clearModel() {
    this.model = new Propiedad();
  }

  setModel(m) {
    this.model = m;
    this.modelVacio = false;
  }

  getSearch() {
    return this.http.post(this.config.getAPIUrl() + this.wsa, this.busqueda.toReqParams());
  }

  getEquipamiento() {
    return this.http.get(this.config.getAPIUrl() + this.wse);
  }

  getAmbientes() {
    return this.http.get(this.config.getAPIUrl() + this.wsam);
  }

  getServicios() {
    return this.http.get(this.config.getAPIUrl() + this.wser);
  }

  getTiposPropiedad() {
    return this.http.get(this.config.getAPIUrl() + this.wtpr);
  }

  getCaraceristicas() { //[modificar] para no hacer peticiones de gusto
    return this.http.get(this.config.getAPIUrl() + this.wscg);
  }

  getPropiedad(id) {
    this.http.post(this.config.getAPIUrl() + this.wsp, { 'id': id })
      .subscribe((r) => {
        this.model = new Propiedad();
        this.model.amenities = r['data'].amenities;
        this.model.servicios = r['data'].servicios;
        this.model.ambientes = r['data'].ambientes;
        this.model.inmobiliaria = r['data'].inmobiliaria;
        this.model.carac_gral = r['data'].carac_gral;
        this.model.latitud = Number(r['data'][0].latitud);
        this.model.longitud = Number(r['data'][0].longitud);
        this.model.files = r['data'].files;
        this.model.files.push({
          nombre: 'googlemapimage',
          url: `https://maps.googleapis.com/maps/api/staticmap?center=${this.model.latitud},${this.model.longitud}&markers=color:red%7Clabel:C%7C${this.model.latitud},${this.model.longitud}&zoom=12&size=600x400&key=${environment.googleApiKey}`
        });
        this.model.id = r['data'][0].id;
        this.model.propietario_id = parseInt(r['data'][0].propietario_id);
        this.model.cochera = r['data'][0].cochera;
        this.model.user = r['data'][0].user;
        this.model.dormitorios = r['data'][0].dormitorios;
        this.model.ambientes_c = r['data'][0].ambientes;
        this.model.banios = r['data'][0].banios;
        this.model.precio = r['data'][0].precio;
        this.model.valor_dia = r['data'][0].valor_dia;
        this.model.valor_semana = r['data'][0].valor_semana;
        this.model.valor_mes = r['data'][0].valor_mes;
        this.model.expensas = r['data'][0].expensas;
        this.model.superficie_total = r['data'][0].superficie_total;
        this.model.superficie_cubierta = r['data'][0].superficie_cubierta;
        this.model.moneda_simbolo = r['data'][0].moneda_simbolo;
        this.model.nombre_operacion = r['data'][0].nombre_operacion;
        this.model.texto = r['data'][0].texto;
        this.model.direccion_old = r['data'][0].direccion;
        this.model.direccion = this.model.direccion_old.toString().replace(/,/g, ' ')
        this.model.nombre_zona = r['data'][0].nombre_zona;
        this.model.titulo = r['data'][0].titulo;
        this.model.zona = r['data'][0].zona_id;
        this.model.disposicion = parseInt(r['data'][0].disposicion);
        this.model.tipo_propiedad_id = r['data'][0].tipo_propiedad_id;
        this.model.tipo_prop_nombre = r['data'][0].tipo_prop_nombre;
        this.model.tipo_operacion_id = parseInt(r['data'][0].tipo_operacion_id);
        this.model.id_provincia = r['data'][0].id_provincia;
        this.model.ciudad   = r['data'][0].ciudad;
        this.model.provincia = r['data'][0].provincia;
        this.model.barrio = r['data'][0].barrio;
        this.model.calle1 = r['data'][0].calle1;
        //console.log(r['data'][0].disposicion)
        //Ingresar imagenes reales de la propiedad
        this.propiedadLoaded.next(this.model);
      });
  }

  getSearchConfig(params: any, propietario?: number) {
    if (propietario) {
      this.busqueda.propietario_id = propietario;
    } else if (this.busqueda.hasOwnProperty('propietario_id')) {
      delete this.busqueda.propietario_id;
    }

    this.busqueda.fromRouteParams(params);

    return this.http.post(this.config.getAPIUrl() + this.wsc, this.busqueda.toReqParams());
  }

  create() {
    this.model.propietario_id = this.user.getId();
    this.model.inmobiliaria_id = this.user.getIdInmobiliaria();
    return this.http.post(this.config.getAPIUrl() + this.wsn, this.model);
  }

  edit() {
    this.model.propietario_id = this.user.getId();
    this.model.inmobiliaria_id = this.user.getIdInmobiliaria();
    return this.http.post(this.config.getAPIUrl() + this.wsed, this.model);
  }

  delete(id: number) {
    return this.http.delete(this.config.getAPIUrl() + `propiedad/${id}/delete`);
  }

  destacar(id: number) {
    return this.http.delete(this.config.getAPIUrl() + `propiedad/${id}/destacar`);
  }

  clearParams() {
    this.busqueda = new Busqueda();
  }
}
