import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GralInfoService {

  private url = './creoPropAPI/web/';
  private ws  = 'main/general-data';

  constructor(
    private http: HttpClient
  ) { }

  getInfo() {
    return this
            .http
            .get(this.url+this.ws);
        }
}
