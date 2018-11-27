import { Inmobiliaria } from './inmobiliaria';

export class Perfil {
  public nombre: string = '';
  public apellido: string = '';
  public homePhone: string = '';
  public ubicacion: string = '';
  public usuario_desde: string = '';
  public img: string = '';
  public tipoUsuario: string = '';
  public img_data: any = [];
  public prop_count: number = 0;
  public user_id: number = -1;

  //keys nombre real
  name: string;
  surname: string;
  profile_img: string;
  created_at: string;
  cant_prop: number;

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

  getFullName(isPublic: boolean) {
    if (!isPublic) {
      return (+this.tipo_user_id) === 2 ? this.inmobiliaria.nombre : this.nombre + ' ' + this.apellido;

    } else {
      return (+this.tipo_user_id) === 2 ? this.inmobiliaria.nombre : this.name + ' ' + this.surname;
    }
  }

  getImgRoute(isPublic: boolean) {
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

}
