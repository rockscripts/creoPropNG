import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

import { ConfigService } from './config.service';
import { Perfil }        from './../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profileGet     = new Subject();
  public profileUpdated = new Subject();

  private profile = new Perfil();
  private wsp     = 'user/profile';
  private wspu    = 'user/editProfile';

  getProfile(id){
    this.http.post(this.config.getAPIUrl()+this.wsp,{'id':id}).subscribe((r) => {
      r = r ['data'];
      this.profileGet.next(r);
    });
  }

  updateProfile(model){
    this.http.post(this.config.getAPIUrl()+this.wspu,model).subscribe((r) => {
      r = r['data'];
      this.profileUpdated.next(r);
    });
  }

  actualProfile(){ return this.profile; }

  constructor(
    private http:   HttpClient,
    private config: ConfigService
  ) {
    this.profileGet.subscribe({
      next: (v) => {
        this.profile.nombre        = v['name'];
        this.profile.apellido      = v['surname'];
        this.profile.ubicacion     = '';
        this.profile.usuario_desde = v['created_at'];
        this.profile.prop_count    = v['cant_prop'];
        this.profile.user_id       = v['id'];
        this.profile.img           = v['profile_img'];
        this.profile.celular       = v['celular'];

        this.profile.inmobiliaria.nombre = v['inmobiliaria']['nombre'];
        this.profile.inmobiliaria.id     = v['inmobiliaria']['id'];
        this.profile.inmobiliaria.img    = v['inmobiliaria']['logo'];
      }
    });
  }
}
