import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService }        from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GralInfoService {

  private ws  = 'main/general-data';

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  getInfo() {
    return this
            .http
            .get(this.config.getAPIUrl()+this.ws);
        }
}
