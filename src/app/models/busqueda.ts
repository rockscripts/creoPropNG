import { SwitchView } from "@angular/common/src/directives/ng_switch";
import { isNumber } from "util";

export class Busqueda {
  public ubicacion: any = {};
  public ubicacion_provincia: number;
  public ubicacion_partido: number;
  public tipoOperacion: number;
  public tipoPropiedad: number;
  public precio: string;
  public tipoMoneda: string;
  public expensas: string;
  public ambientes: number;
  public dormitorios: number;
  public cantidadBanios: number;
  public cocheras: number;
  public superficie: string;
  public tipoSuperficie: string;
  public tipoAmbiente: any = {};
  public servicios: any = {};
  public generales: any = {};
  public tipoAnunciante: number;

  public propietario_id: number;

  public page: number;

  public orderBy: string;

  constructor() { }

  getMultiParam(paramName) {
    const cleaned = [];
    for (const u in this[paramName]) {
      if (!this[paramName].hasOwnProperty(u)) {
        continue;
      }
      if (this[paramName][u]) {
        cleaned.push(u);
      }
    }
    return cleaned;
  }

  toRouteParams() {
    const params = {};
    for (const paramName of Object.keys(this)) {
      if (!this.hasOwnProperty(paramName) || !this[paramName] && paramName != 'activo') {
        continue;
      }
      switch (paramName) {
        case "servicios":
        case "generales":
        case "tipoAmbiente":
        case "ubicacion":
          if (this.getMultiParam(paramName).length > 0) {
            params[paramName] = this.getMultiParam(paramName).join(",");
          }
          break;
        default:
          params[paramName] = this[paramName];
      }
    }
    return params;
  }

  fromRouteParams(params) {
    for (const paramName in params) {
      if (!params.hasOwnProperty(paramName)) {
        continue;
      }
      switch (paramName) {
        case "servicios":
        case "generales":
        case "tipoAmbiente":
        case "ubicacion":
          const values = params[paramName].split(",");
          for (const v of values) {
            if (0 !== +v) {
              this[paramName][+v] = true;
            }
          }
          break;
        default:
          this[paramName] = params[paramName];
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
        case "servicios":
        case "generales":
        case "tipoAmbiente":
        case "ubicacion":
          params[p] = this.getMultiParam(p);
          break;
        default:
          params[p] = this[p];
      }
    }

    if (params["ubicacion"].length === 0) {
      if (params["ubicacion_partido"]) {
        params["ubicacion"] = [params["ubicacion_partido"]];
      } else if (params["ubicacion_provincia"]) {
        params["ubicacion"] = [params["ubicacion_provincia"]];
      }
    } else {
      delete params["ubicacion_provincia"];
      delete params["ubicacion_partido"];
    }

    return JSON.stringify(params);
  }
}
