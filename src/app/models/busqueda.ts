import { SwitchView } from "@angular/common/src/directives/ng_switch";
import { isNumber } from "util";

export class Busqueda {
  public ubicacion: object;
  public ubicacion_padre: number;
  public tipoOperacion: number;
  public tipoPropiedad: number;
  public precio: number;
  public expensas: number;
  public ambientes: number;
  public dormitorios: number;
  public cantidadBanios: number;
  public cocheras: number;
  public superficie: number;
  public tipoAmbiente: number;
  public servicios: number;
  public generales: number;
  public tipoAnunciante: number;

  public propietario_id: number;

  public page: number;

  constructor() {}

  getUbicacion() {
    const cleaned_ubicacion = [];
    for (const u in this.ubicacion) {
      if (!this.ubicacion.hasOwnProperty(u)) {
        continue;
      }
      if (this.ubicacion[u]) {
        cleaned_ubicacion.push(u);
      }
    }
    return cleaned_ubicacion;
  }

  toRouteParams() {
    const params = {};
    for (const p of Object.keys(this)) {
      if (!this.hasOwnProperty(p) || !this[p]) {
        continue;
      }
      switch (p) {
        case "ubicacion":
          params[p] = this.getUbicacion().join(",");
          break;
        default:
          params[p] = this[p];
      }
    }
    return params;
  }

  fromRouteParams(params) {
    for (const p in params) {
      if (!params.hasOwnProperty(p)) {
        continue;
      }
      switch (p) {
        case "ubicacion":
          const ubicacion = params[p].split(",");
          for (const u of ubicacion) {
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
    for (const p of Object.keys(this)) {
      if (!this.hasOwnProperty(p) || !this[p]) {
        continue;
      }
      switch (p) {
        case "ubicacion":
          params[p] = this.getUbicacion();
          break;
        default:
          params[p] = this[p];
      }
    }
    return JSON.stringify(params);
  }
}
