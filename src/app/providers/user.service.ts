import { Injectable } from '@angular/core'; // [Refactorizar]
import { HttpClient } from '@angular/common/http';

import { Subject }    from 'rxjs/Subject';

import { ConfigService } from './config.service';

import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData:any = {
    "idUser" : -1,
    'model'  : {}
  };
  private wsn = 'user/create';
  private wsl = 'user/login';

  public onLogin = new Subject();

  public model;

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  setLogin(r){
    this.userData.idUser = 1;
  }

  logeado(){
    return this.userData.idUser != -1;
  }

  permiso(n){
    if (this.logeado()){
      return true;
    }
    return false;
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
