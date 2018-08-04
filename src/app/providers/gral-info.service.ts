import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

<<<<<<< HEAD

import { ConfigService } from './config.service';
=======
import { ConfigService }        from './config.service';

>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a

@Injectable({
  providedIn: 'root'
})
export class GralInfoService {

<<<<<<< HEAD
  private ws  = 'main/general-data';

  constructor(
    private http: HttpClient,
=======
  private url = '/creoPropAPI/web/';
  private ws  = 'main/general-data';

  constructor(
    private http:   HttpClient,
>>>>>>> e61a697b9476903027fcc7f3da80816b7b67ba7a
    private config: ConfigService
  ) { }

  getInfo() {
    return this
            .http
            .get(this.config.getAPIUrl()+this.ws);
        }
}
