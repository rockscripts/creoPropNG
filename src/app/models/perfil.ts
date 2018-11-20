import { Inmobiliaria } from './inmobiliaria';

export class Perfil {
  public nombre: string = '';
  public apellido: string = '';
  public celular: string = '';
  public homePhone: string = '';
  public email: string = '';
  public ubicacion: string = '';
  public usuario_desde: string = '';
  public img: string = '';
  public tipoUsuario: string = '';

  public img_data: any = [];
  public prop_count: number = 0;
  public user_id: number = -1;

  //nuevas keys perfil privado
  tel: string = '';
  id: string = '';
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

  //mostrar en mi cuenta
  membresia: string = '';

  public inmobiliaria: Inmobiliaria = new Inmobiliaria();



  constructor(
  ) { }

}
