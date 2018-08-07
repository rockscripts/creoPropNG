import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData:any = {};
  private wsi = 'user/login';

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  getUserData(){
    return this.userData;
  }

  logIn(){

  }

  logOut(){

  }

  create(){

  }
}
