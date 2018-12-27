import { Injectable } from '@angular/core'; // [Refactorizar]
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { ConfigService } from './config.service';
import { User } from './../models/user';
import { Inmobiliaria } from './../models/inmobiliaria';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData = new User();

  private wsn = 'user/create';
  private wsl = 'user/login';
  private wst = 'user/get-types';

  public onLogin = new Subject();
  public onLogOut = new Subject();

  public model;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      this.userData = currentUser;
    }
  }

  setLogin(r) {
    this.userData.id = r['data']['id'];//[modificar] esta info es de perfil no de usuario
    this.userData.email = r['data']['email'];
    this.userData.token = r['data']['token'];
    this.userData.nombre = r['data']['name'];
    this.userData.apellido = r['data']['surname'];
    this.userData.tipo_user_id = r['data']['tipo_user_id'];
    // this.userData.telFijo      = r['data']['tel'];
    this.userData.telefono = r['data']['celular'];
    // this.userData.dni          = r['data']['dni'];
    // this.userData.cuit         = r['data']['cuit'];

    this.userData.perfil.nombre = r['data']['name'];
    this.userData.perfil.apellido = r['data']['surname'];
    //this.userData.perfil.ubicacion   = r['data']['surname'];
    this.userData.perfil.usuario_desde = r['data']['created_at'];
    this.userData.perfil.img = r['data']['profile_img'];
    this.userData.perfil.prop_count = r['data']['cant_prop'];
    this.userData.perfil.user_id = r['data']['id'];
    this.userData.perfil.img = r['data']['profile_img'];
    this.userData.perfil.celular = r['data']['celular'];

    if (r['data']['membresia']) {
      this.userData.membresia = r['data']['membresia']['nombre'];
      this.userData.membresia_id = r['data']['membresia']['id'];
    }

    if (r['data']['inmobiliaria']) {
      let inm = new Inmobiliaria();
      inm.id = r['data']['inmobiliaria']['id'];
      inm.nombre = r['data']['inmobiliaria']['nombre'];
      inm.img = r['data']['inmobiliaria']['logo'];
      this.userData.setInmobiliaria(inm);
    }

    localStorage.setItem('currentUser', JSON.stringify(this.userData));
  }

  logeado() {
    return this.userData.id != -1;
  }

  getPlanId() {
    if (this.logeado()) {
      return this.userData.membresia_id;
    }
    return -1;
  }

  permiso(n) {
    if (this.logeado()) {
      return true;
    }
    return false;
  }

  logIn() {
    return this.http.post(this.config.getAPIUrl() + this.wsl, this.model);
  }

  logOut() { //todaia faltan agregar funcionalidades por acá
    this.userData = new User();
    this.router.navigate(['/']);
    this.onLogOut.next();

    localStorage.removeItem('currentUser');
  }

  create() { return this.http.post(this.config.getAPIUrl() + this.wsn, JSON.stringify(this.model)); }

  getTypes() { return this.http.get(this.config.getAPIUrl() + this.wst); }

  clearModel() { this.model = new User(); }
  getId() { return this.userData.id; }
  getUserData() { return this.userData; }
  getToken() { return this.userData.token; }
  getProfile() { return this.userData.perfil; }
  getEmail() { return this.userData.email; }
  getName() {
    if (this.userData.nombre == '') {
      return this.userData.email;
    } else {
      return this.userData.apellido + ' ' + this.userData.nombre;
    }
  }
  getIdInmobiliaria() { return this.userData.inmobiliaria.id; }

  getInmobiliarias(): Observable<any> {
    return this.http.get(this.config.getAPIUrl() + 'inmobiliaria/all');
  }
  verifyAccount() {
    return this.http.get(this.config.getAPIUrl() + 'reverify/' + this.userData.id);
  }
}
