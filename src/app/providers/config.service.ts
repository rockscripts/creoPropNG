import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

<<<<<<< HEAD
  private urlApi = 'http://localhost/creoPropAPI/web/';
=======
  private urlApi = '/creoPropAPI/web/';
>>>>>>> 4ad7692045ed8bada68c4b8d508c97918935be7c

  constructor() { }

  getAPIUrl(){
    return this.urlApi;
  }
}
