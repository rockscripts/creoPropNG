import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData:any = {};

  constructor() { }

  getUserData(){
    return this.userData;
  }
}
