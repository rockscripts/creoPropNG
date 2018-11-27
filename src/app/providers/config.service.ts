import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // private urlApi = 'http://creoprop.com.ar/creoPropAPI/web/';
  private urlApi = 'http://192.168.0.13:8000/';

  constructor() { }

  getAPIUrl() {
    return this.urlApi;
  }
}
