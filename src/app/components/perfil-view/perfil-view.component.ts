import { Component, OnInit, Input } from '@angular/core';

import { UserService }             from './../../providers/user.service';
import { ProfileService }          from './../../providers/profile.service';
import { UserProfileModalService } from './../../components/user-profile-modal/user-profile-modal.service';
import { Perfil }                  from './../../models/perfil';
@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.css']
})
export class PerfilViewComponent implements OnInit {
  @Input() editable:string = '';

  perfil = new Perfil();

  constructor(
    private user:    UserService,
    private pModal:  UserProfileModalService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    if (this.editable) {
      this.profile.getProfile(this.user.getId()).subscribe((r) => {
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
    } else {
      this.perfil = this.profile.actualProfile();
    }
  }

  edit(){
    this.pModal.show();
  }

}
