import { Injectable } from '@angular/core'; // [Refactorizar]
import { HttpClient } from '@angular/common/http';

import { Subject }    from 'rxjs/Subject';

import { ConfigService } from './config.service';

import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData = new User();

  private wsn = 'user/create';
  private wsl = 'user/login';
  private wst = 'user/get-types';

  public onLogin = new Subject();

  public model;

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) { }

  setLogin(r){
    this.userData.id           = r['data']['id'];
    this.userData.inmobiliaria = r['data']['inmobiliaria_id'];
    this.userData.email        = r['data']['email'];
    this.userData.token        = r['data']['token'];
    this.userData.nombre       = r['data']['name'];
    this.userData.apellido     = r['data']['surname'];
    this.userData.tipoUser     = r['data']['tipo_user_id'];
    this.userData.telFijo      = r['data']['tel'];
    this.userData.telefono     = r['data']['celular'];
    this.userData.dni          = r['data']['dni'];
    this.userData.cuit         = r['data']['cuit'];
  }

  logeado(){
    return this.userData.id != -1;
  }

  permiso(n){
    if (this.logeado()){
      return true;
    }
    return false;
  }

  logIn(){
    return this.http.post(this.config.getAPIUrl()+this.wsl, this.model);
  }

  logOut(){

  }

  create(){
    return this.http.post(this.config.getAPIUrl()+this.wsn, JSON.stringify(this.model));
  }

  getTypes(){
    return this.http.get(this.config.getAPIUrl()+this.wst);
  }

  clearModel()  { this.model = new User(); }
  getId()       { return this.userData.id; }
  getUserData() { return this.userData; }
  getName(){
    if (this.userData.nombre == ''){
      return this.userData.email;
    } else {
      return this.userData.apellido + ' ' +this.userData.nombre;
    }
  }
}
