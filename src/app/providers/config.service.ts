import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private urlApi = 'http://creoprop.tld/'; //http://localhost ./

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}
