import { Component, OnInit, Input } from '@angular/core';

import { UserService } from './../../providers/user.service';
import { ProfileService } from './../../providers/profile.service';
import { UserProfileModalService } from './../../components/user-profile-modal/user-profile-modal.service';
import { Perfil } from './../../models/perfil';
@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.css']
})
export class PerfilViewComponent implements OnInit {
  @Input() editable: string = '';

  perfil = new Perfil();
  perfilState: any = {};

  //profile keys segun tipo usuario
  private ownerProfile: ProfileKey[] = [
    {
      key: 'nacionalidad',
      name: 'nacionalidad',
      state: false
    },
    {
      key: 'idiomas',
      name: 'idiomas',
      state: false
    }
  ];
  private agentProfile: ProfileKey[] = [
    {
      key: 'nacionalidad',
      name: 'nacionalidad',
      state: false
    },
    {
      key: 'idiomas',
      name: 'idiomas',
      state: false
    },
    {
      key: 'experiencia_desde',
      name: 'experiencia desde el año',
      state: false
    },
    {
      key: 'areas',
      name: 'áreas',
      state: false
    },
    {
      key: 'matricula',
      name: 'número de matrícula',
      state: false
    },
    {
      key: 'colegio_inmobiliario',
      name: 'perteneciente al colegio profesional de corredores inmobiliarios',
      state: false
    },
    {
      key: 'linkedin',
      name: 'linkedin',
      state: false
    }
  ];
  private inmoProfile: ProfileKey[] = [
    {
      key: 'experiencia_desde',
      name: 'trayectoria desde el año',
      state: false
    },
    {
      key: 'areas',
      name: 'áreas',
      state: false
    },
    {
      key: 'ceo',
      name: 'ceo',
      state: false
    },
    {
      key: 'matricula',
      name: 'número de matrícula',
      state: false
    },
    {
      key: 'colegio_inmobiliario',
      name: 'perteneciente al colegio profesional de corredores inmobiliarios',
      state: false
    },
    {
      key: 'oficina',
      name: 'oficina central',
      state: false
    }
  ];
  public contactData: ProfileKey[] = [
    {
      key: 'celular',
      name: 'celular',
      icon: 'ws',
      state: false
    },
    {
      key: 'tel',
      name: 'oficina',
      icon: 'phone',
      state: false
    },
    {
      key: 'email',
      name: 'email',
      icon: 'alternate_email',
      state: false
    }
  ];
  public currentProfile: ProfileKey[] = [];
  public descripcionState: boolean = false;

  constructor(
    private user: UserService,
    private pModal: UserProfileModalService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    if (this.editable) {
      this.profile.getProfile(this.user.getId())
        .subscribe((r) => {
          if (!r || !r['data']) {
            return;
          }

          r = r['data'];
          this.perfil.nombre = r['name'];
          this.perfil.apellido = r['surname'];

          this.perfil.id = r['id'];
          this.perfil.celular = r['celular'];
          this.perfil.tel = r['tel'];
          this.perfil.email = r['email'];

          this.perfil.areas = r['areas'];
          this.perfil.ceo = r['ceo'];
          this.perfil.colegio_inmobiliario = r['colegio_inmobiliario'];
          this.perfil.descripcion = r['descripcion'];
          this.perfil.experiencia_desde = r['experiencia_desde'];
          this.perfil.idiomas = r['idiomas'];
          this.perfil.linkedin = r['linkedin'];
          this.perfil.matricula = r['matricula'];
          this.perfil.nacionalidad = r['nacionalidad'];
          this.perfil.oficina = r['oficina'];

          if (r['id_inmobiliaria']) {
            this.perfil.inmobiliaria.nombre = r['inmobiliaria']['nombre'];
            this.perfil.inmobiliaria.id = r['inmobiliaria']['id'];
            this.perfil.inmobiliaria.img = r['inmobiliaria']['logo'];
          }

          let tipo = +r['tipo_user_id'];

          this.currentProfile = tipo === 1 ? this.ownerProfile : tipo === 3 ? this.agentProfile : this.inmoProfile;
        });
    } else {
      this.perfil = this.profile.actualProfile();
    }
  }

  edit(key: string, type: string = '') {
    this.profile.updateProfile(this.perfil)
      .subscribe(res => {
        if (key !== 'descripcion') {
          this[type !== 'contact' ? 'currentProfile' : 'contactData'].find(item => item.key === key).state = false;
        } else {
          this.descripcionState = false;
        }
      });
  }
}

export interface ProfileKey {
  name: string;
  key: string;
  state: boolean;
  icon?: string;
}
