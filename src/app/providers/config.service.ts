import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getAPIUrl() {
    return environment.urlApi;
  }

  getAPIImg() {
    return environment.img;
  }
}
