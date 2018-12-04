import { Inmobiliaria } from './inmobiliaria';

export class Perfil {
  nombre: string = '';
  apellido: string = '';
  homePhone: string = '';
  ubicacion: string = '';
  usuario_desde: string = '';
  img: string = '';
  tipoUsuario: string = '';
  img_data: any = [];
  prop_count: number = 0;
  user_id: number = -1;

  //keys nombre real
  name: string;
  surname: string;
  profile_img: string;
  created_at: string;
  cant_prop: number;
  active_prop: number;

  //perfil keys
  email: string = '';
  celular: string = '';
  tel: string = '';
  id: number;
  areas: string = '';
  ceo: string = '';
  colegio_inmobiliario: string = '';
  descripcion: string = '';
  experiencia_desde: string = '';
  idiomas: string = '';
  linkedin: string = '';
  matricula: string = '';
  nacionalidad: string = '';
  oficina: string = '';
  id_inmobiliaria: number;
  inmobiliaria: Inmobiliaria = new Inmobiliaria();

  //mostrar en mi cuenta
  membresia: string = '';
  tipo_user_id: number;
  tipo_user_name: string;
  verified: number;


  constructor(profileData?, inmoData?: Inmobiliaria) {
    if (profileData && inmoData) {
      Object.assign(this, this.toNumber(profileData));
      this.inmobiliaria = new Inmobiliaria(inmoData);

      [
        'nombre',
        'apellido',
        'homePhone',
        'ubicacion',
        'usuario_desde',
        'img',
        'tipoUsuario',
        'img_data',
        'prop_count',
        'user_id'
      ].forEach(key => {
        delete this[key];
      });

      return this;
    }
  }

  getFullName(isPublic?: boolean) {
    if (!isPublic) {
      return (+this.tipo_user_id) === 2 ? this.inmobiliaria.nombre : this.nombre + ' ' + this.apellido;

    } else {
      return (+this.tipo_user_id) === 2 ? this.inmobiliaria.nombre : this.name + ' ' + this.surname;
    }
  }

  getImgRoute(isPublic?: boolean) {
    if (!isPublic) {
      return (+this.tipo_user_id) === 2 ? this.inmobiliaria.img : this.img;

    } else {
      return (+this.tipo_user_id) === 2 ? this.inmobiliaria.logo : this.profile_img;
    }
  }

  private toNumber(data: any): any {
    data = { ...data };
    Object.keys(data).forEach(key => {
      if (/^[0-9]+$/g.test(data[key])) {
        data[key] = +data[key];
      }
    });

    return data;
  }

  getTypeUserFirstWord(): string {
    return (this.tipo_user_name || '').split(' ')[0].toUpperCase();
  }

  getPhoneNumber(type: string): number {
    return +String(this['cel' ? 'celular' : 'tel']).replace(/\+/g, '');
  }
}
