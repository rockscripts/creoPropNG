import { Component, OnInit }   from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { UserService }          from './../../providers/user.service';
import { RegisterModalService } from '../../components/register-modal/register-modal.service';
import { LoginModalService }    from '../../components/login-modal/login-modal.service';
import { ProfileService }          from './../../providers/profile.service';
import { Perfil }                  from './../../models/perfil';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  perfil = new Perfil();

  constructor(
    private us:         UserService,
    private modalReg:   RegisterModalService,
    private modalLogin: LoginModalService,
    private router:     Router,
    private profile: ProfileService
  ){}

  hideSearchBox = false;
  registrado = false;
  navbar_red = true;

  userName:string = '';

  enlaces:any=[
    { r: "select-plan", t: 'PUBLICAR UNA PROPIEDAD', attr:'' }
  ];

  ngOnInit() {
    this.registrado = this.us.logeado();
    if(this.registrado) {
      this.userName   = this.us.getName();
    }

    this.getProfile();
    
    this.us.onLogin.subscribe({ next: (v) => { this.actualizaEstado(); this.getProfile(); } });
    this.us.onLogOut.subscribe({ next: (v) => { this.actualizaEstado(); } });

    this.router.events.subscribe((e) => {
      if(e instanceof RouterEvent){
        if (e.url.indexOf('/mi-cuenta') === 0 || e.url.indexOf('/new-prop') === 0){
          this.hideSearchBox = true;
        } else {
          this.hideSearchBox = false;
        }
        if (e.url == '/select-plan' || e.url == '/update-plan'){
          this.navbar_red = false;
        } else {
          this.navbar_red = true;
        }
      }
    });
  }

  getProfile() {
    this.profile.getProfile(this.us.getId()).subscribe((r) => {
      r = r["data"];
      this.perfil.nombre        = r['name'];
      this.perfil.apellido      = r['surname'];
      this.perfil.ubicacion     = '';
      this.perfil.usuario_desde = r['created_at'];
      this.perfil.prop_count    = r['cant_prop'];
      this.perfil.user_id       = r['id'];
      this.perfil.img           = r['profile_img'];
      this.perfil.celular       = r['celular'];

      this.perfil.inmobiliaria.nombre = r['inmobiliaria']['nombre'];
      this.perfil.inmobiliaria.id     = r['inmobiliaria']['id'];
      this.perfil.inmobiliaria.img    = r['inmobiliaria']['logo'];
    });
  }

  showRegistrar(){ this.modalReg.show();   }
  showLogin() {    this.modalLogin.show(); }

  actualizaEstado(){
    this.registrado = this.us.logeado();
    if(this.registrado) {
      this.userName   = this.us.getName();
    }
  }

  logOut(){ // [Revisar] si estructuralmente seria correcto dejar esto opr aca
    this.us.logOut();
  }
}
