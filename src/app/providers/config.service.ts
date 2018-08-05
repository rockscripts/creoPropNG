import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private urlApi = '/creoPropAPI/web/';

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}
