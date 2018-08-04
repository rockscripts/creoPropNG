import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

<<<<<<< HEAD
  private urlApi = '/creoPropAPI/web/';
=======
  private urlApi = './creoPropAPI/web/';
>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}
