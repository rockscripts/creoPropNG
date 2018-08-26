import { Perfil }       from './perfil';
import { Inmobiliaria } from './inmobiliaria';

export class User {
  public email        :string = '';
  public pass         :string = '';
  public nombre       :string = '';
  public apellido     :string = '';
  public dni          :string = '';
  public telefono     :string = '';
  public tipoUser     :number = 0;
  public cuit         :string = '';
  public telFijo      :string = '';
  public token        :string = '';
  public id           :number = -1;

  public inmobiliaria:Inmobiliaria = new Inmobiliaria();
  public perfil:Perfil             = new Perfil();

  public formValid(){

  }

  setInmobiliaria(i){
    this.inmobiliaria        = i;
    this.perfil.inmobiliaria = i;
  }
}
