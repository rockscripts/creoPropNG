import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // private urlApi = 'http://creoprop.com.ar/creoPropAPI/web/';

  constructor() { }

  getAPIUrl() {
    return environment.urlApi;
  }
}
