import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private urlApi = 'http://192.168.0.101/creoPropAPI/web/'; //http://localhost

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}
