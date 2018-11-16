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

  public img_data: any = [];

  public prop_count: number = 0;
  public user_id: number = -1;

  public inmobiliaria: Inmobiliaria = new Inmobiliaria();



  constructor(
  ) { }

}
