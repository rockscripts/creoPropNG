import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // private urlApi = 'http://creoprop.com.ar/creoPropAPI/web/';
  private urlApi = 'http://localhost:8080/';

  constructor() { }

  getAPIUrl() {
    return this.urlApi;
  }
}
