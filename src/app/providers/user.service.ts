import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData:any = {
    "idUser" : null,
    'model'  : {}
  };
  private wsn = 'user/create';
  private wsl = 'user/login';

  public model;

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  setLogin(r){
    this.userData.idUser = 1;
  }

  getUserData(){
    return this.userData;
  }

  logeado(){
    return this.userData.idUser != null;
  }

  logIn(){
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsl, JSON.stringify(this.model));
  }

  logOut(){

  }

  create(){
    return this
            .http
            .post(this.config.getAPIUrl()+this.wsn, JSON.stringify(this.model));
  }
}
