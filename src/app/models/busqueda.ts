import { SwitchView } from "@angular/common/src/directives/ng_switch";
import { isNumber } from "util";

export class Busqueda {
  public ubicacion:       object = {};
  public termDireccion:   string = '';
  public tipoOperacion:   number = -1;
  public tipoPropiedad:   number = -1;
  public propietario_id:  number = -1;
  public inmobiliaria_id: number = -1;
  public provincia:any;

  public page: number = 0;
  
  constructor() {  }

  getUbicacion() {
    const cleaned_ubicacion = [];
    for(const u in this.ubicacion){
      if(!this.ubicacion.hasOwnProperty(u)){
        continue;
      }
      if(this.ubicacion[u]){
        cleaned_ubicacion.push(u);
      }
    }
    return cleaned_ubicacion;
  }

  toRouteParams() {
    const params = {};
    for( const p of Object.keys(this)){
      if(!this.hasOwnProperty(p) || this[p] === ''){
        continue;
      }
      switch (p) {
        case 'ubicacion':
          params[p] = this.getUbicacion().join(',');
        break;
        default:
          params[p] = this[p];
      }
    }
    return params;
  }

  fromRouteParams(params) {
    for( const p in params ){
      if(!this.hasOwnProperty(p)){
        continue;
      }
      switch (p) {
        case 'ubicacion':
          const ubicacion = params[p].split(',');
          for(const u of ubicacion) {
            console.log(u);
            
            if (0 !== +u) {
              this[p][+u] = true;
            }
          }
        break;
        default:
          this[p] = params[p];
      }
    }
  }

  toReqParams() {
    const params = {};
    for( const p of Object.keys(this)){
      if(!this.hasOwnProperty(p) || this[p] === ''){
        continue;
      }
      switch (p) {
        case 'ubicacion':
          params[p] = this.getUbicacion();
        break;
        default:
          params[p] = this[p];
      }
    }
    return JSON.stringify(params);
  }
}
