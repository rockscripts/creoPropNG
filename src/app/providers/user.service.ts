import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData:any = {
    "idUser" : null
  };

  constructor() { }

  getUserData(){
    return this.userData;
  }

  logeado(){
    return this.userData.idUser != null;
  }
}
