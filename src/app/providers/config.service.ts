import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private urlApi = 'http://localhost/creoPropAPI/web/'; //http://localhost ./

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}
