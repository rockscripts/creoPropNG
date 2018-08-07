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
  private wsi = 'user/login';

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  getUserData(){
    return this.userData;
  }

  logeado(){
    return this.userData.idUser != null;
  }

  logIn(){

  }

  logOut(){

  }

  create(){

  }
}
