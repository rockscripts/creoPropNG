import { Component, OnInit } from '@angular/core';

import { Busqueda }          from './../../models/busqueda';

import { UserService }       from './../../providers/user.service';
import { ProfileService }          from './../../providers/profile.service';
import { Perfil }                  from './../../models/perfil';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  
  public propietario_id: any;
  perfil = new Perfil();
  userName:string = '';

  constructor(
  	private user: UserService
    private profile: ProfileService
    ) { }

  ngOnInit() {
  	this.propietario_id = this.user.getId();

    this.getProfile();
  }

  getProfile() {
    this.profile.getProfile(this.user.getId()).subscribe((r) => {
      if(!r || !r["data"]){
        return;
      }
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

      if (this.perfil.nombre != ''){
        this.userName   = this.perfil.nombre + ' ' + this.perfil.apellido;
      }
    });
  }

}
