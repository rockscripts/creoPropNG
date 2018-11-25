import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private urlApi = 'https://creoprop.com.ar/creoPropAPI/web/'; //http://localhost ./

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}