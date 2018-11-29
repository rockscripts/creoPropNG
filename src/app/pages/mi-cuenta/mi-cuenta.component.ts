import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Busqueda } from './../../models/busqueda';
import { UserService } from './../../providers/user.service';
import { ProfileService } from './../../providers/profile.service';
import { Perfil } from './../../models/perfil';
import { PropiedadesService } from '../../providers/propiedades.service';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  @ViewChild('loadImg') loadImg: ElementRef;

  public propietario_id: any;
  perfil = new Perfil();
  pActivas: number = 0;
  pInactivas: number = 0;
  nameState: boolean = false;
  public baseRoute = environment.assetsRoute;

  constructor(
    private user: UserService,
    private profile: ProfileService,
    private Propiedades: PropiedadesService
  ) { }

  ngOnInit() {
    this.propietario_id = this.user.getId();
    this.getProfile();
    this.Propiedades.getCountsPropiedades(this.user.getId())
      .subscribe((r) => {
        this.pActivas = r['data']['pActivas'];
        this.pInactivas = r['data']['pInactivas'];
      });
  }

  getProfile(onUpdate: boolean = false) {
    this.profile.getProfile(this.user.getId()).subscribe((r) => {
      if (!r || !r["data"]) {
        return;
      }
      r = r["data"];
      this.perfil.nombre = r['name'];
      this.perfil.apellido = r['surname'];
      // this.perfil.ubicacion = '';
      // this.perfil.usuario_desde = r['created_at'];
      this.perfil.prop_count = r['cant_prop'];
      this.perfil.id = r['id'];
      this.perfil.img = r['profile_img'];
      // this.perfil.celular = r['celular'];
      this.perfil.tipoUsuario = r['tipo_user_name'];
      this.perfil.tipo_user_id = +r['tipo_user_id'];
      this.perfil.membresia = r['membresia'];

      this.perfil.inmobiliaria.nombre = r['inmobiliaria']['nombre'];
      this.perfil.inmobiliaria.id = r['inmobiliaria']['id'];
      this.perfil.inmobiliaria.img = r['inmobiliaria']['logo'];

      if (onUpdate) {
        this.profile.profileUpdated.next(this.perfil.tipo_user_id === 2 ? this.perfil.inmobiliaria.img : this.perfil.img);
      }
    });
  }

  edit(key: string) {
    this.profile.updateProfile(this.perfil)
      .subscribe(res => {
        if (key === 'name') {
          this.nameState = false;
        }
      });
  }

  saveProfileImg(files: FileList) {
    let reader = new FileReader();

    if (files && files.length > 0) {
      let file: File = files[0];

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.perfil.img_data = [
          {
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          }
        ];

        this.profile.updateProfile(this.perfil)
          .subscribe(res => {
            this.loadImg.nativeElement.value = "";
            this.getProfile(true);
          });
      };
    }
  }
}
