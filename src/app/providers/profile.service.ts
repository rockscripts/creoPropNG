import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { ConfigService } from './config.service';
import { Perfil } from './../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profileGet = new Subject();
  public profileUpdated = new Subject();

  private profile = new Perfil();
  private wsp = 'user/profile';
  private wspu = 'user/editProfile';

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  getProfile(id) {
    return this.http.post(this.config.getAPIUrl() + this.wsp, { 'id': id });
  }

  updateProfile(model) {
    return this.http.post(this.config.getAPIUrl() + this.wspu, model);
  }

  actualProfile() { return this.profile; }
}
