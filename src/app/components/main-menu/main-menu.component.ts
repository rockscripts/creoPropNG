import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { UserService } from './../../providers/user.service';
import { RegisterModalService } from '../../components/register-modal/register-modal.service';
import { LoginModalService } from '../../components/login-modal/login-modal.service';
import { ProfileService } from './../../providers/profile.service';
import { Perfil } from './../../models/perfil';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  perfil = new Perfil();

  constructor(
    private us: UserService,
    private modalReg: RegisterModalService,
    private modalLogin: LoginModalService,
    private router: Router,
    private profile: ProfileService
  ) { }

  showSearchBox = true;
  showNavMenu = true;
  registrado = false;
  navbar_red = true;

  userName: string = '';

  enlaces: any = [
    { r: "select-plan", t: 'PUBLICAR UNA PROPIEDAD', attr: '' }
  ];

  ngOnInit() {
    this.registrado = this.us.logeado();
    if (this.registrado) {
      if (this.perfil.nombre != '') {
        this.userName = this.perfil.nombre + ' ' + this.perfil.apellido;
      } else {
        this.userName = this.us.getEmail();
      }
    }

    this.getProfile();

    this.us.onLogin.subscribe({ next: (v) => { this.actualizaEstado(); this.getProfile(); } });
    this.us.onLogOut.subscribe({ next: (v) => { this.actualizaEstado(); } });

    this.profile.profileUpdated
      .subscribe({
        next: (imgRoute: string) => this.perfil.tipo_user_id === 2 ? this.perfil.inmobiliaria.img = imgRoute : this.perfil.img = imgRoute
      });

    this.router.events
      .subscribe(e => {
        if (e instanceof RouterEvent) {
          if (/(\/search;(\w?)+)|(^\/$)/g.test(e.url)) {
            this.showSearchBox = true;
          } else {
            this.showSearchBox = false;
          }

          if (e.url == '/select-plan' || e.url == '/update-plan') {
            this.navbar_red = false;
            this.showNavMenu = false;
          } else {
            this.navbar_red = true;
            this.showNavMenu = true;
          }

          if (/\/perfil\/\d+/g.test(e.url)) {
            this.navbar_red = false;
            this.showNavMenu = true;
          }
        }
      });
  }

  getProfile() {
    this.profile.getProfile(this.us.getId()).subscribe((r) => {
      if (!r || !r["data"]) {
        return;
      }
      r = r["data"];
      this.perfil.nombre = r['name'];
      this.perfil.apellido = r['surname'];
      this.perfil.usuario_desde = r['created_at'];
      this.perfil.prop_count = r['cant_prop'];
      this.perfil.id = r['id'];
      this.perfil.tipo_user_id = +r['tipo_user_id'];
      this.perfil.img = r['profile_img'];
      this.perfil.celular = r['celular'];

      this.perfil.inmobiliaria.nombre = r['inmobiliaria']['nombre'];
      this.perfil.inmobiliaria.id = r['inmobiliaria']['id'];
      this.perfil.inmobiliaria.img = r['inmobiliaria']['logo'];
    });
  }

  showRegistrar() { this.modalReg.show(); }
  showLogin() { this.modalLogin.show(); }

  actualizaEstado() {
    this.registrado = this.us.logeado();
    if (this.registrado) {
      if (this.perfil.nombre != '') {
        this.userName = this.perfil.nombre + ' ' + this.perfil.apellido;
      } else {
        this.userName = this.us.getEmail();
      }
    }
  }

  logOut() { // [Revisar] si estructuralmente seria correcto dejar esto opr aca
    this.us.logOut();
  }
}
