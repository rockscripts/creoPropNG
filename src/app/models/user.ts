import { Perfil } from './perfil'; //[modificar] los datos del usuario (como nombre, telefono, etc) deverian formar parte del perfil
import { Inmobiliaria } from './inmobiliaria';

export class User {
  public email: string = '';
  public pass: string = '';
  public nombre: string = '';
  public apellido: string = '';
  public dni: string = '';
  public telefono: string = '';
  public tipoUser: number = 0;
  public cuit: string = '';
  public telFijo: string = '';
  public token: string = '';
  public id: number = -1;
  public nombreInmo: string = '';
  public ubiInmo: string = '';
  public nroMatricula: string = '';

  public membresia: string = '';
  public membresia_id: number = 0;

  public inmobiliaria: Inmobiliaria = new Inmobiliaria();
  public perfil: Perfil = new Perfil();

  public formValid() {
    if (!this.email) {
      return {
        valid: false,
        msg: 'Ingrese su email'
      }
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email)) {
      return {
        valid: false,
        msg: 'Ingrese un email válido'
      }
    }

    if (!this.pass) {
      return {
        valid: false,
        msg: 'Ingrese una contraseña'
      }
    } else if (this.pass.length < 6) {
      return {
        valid: false,
        msg: 'La contraseña debe contener al menos 6 caracteres'
      }
    }

    if (!this.nombre) {
      return {
        valid: false,
        msg: 'Ingrese su nombre'
      }
    }

    if ([2, 3].includes(+this.tipoUser)) {
      if (!this.apellido) {
        return {
          valid: false,
          msg: 'Ingrese su apellido'
        }
      }

      if (!this.nombreInmo) {
        return {
          valid: false,
          msg: 'Ingrese el nombre de la inmobiliaria a la que pertenece'
        }
      }

      if (this.tipoUser == 2 && !this.ubiInmo) {
        return {
          valid: false,
          msg: 'Ingrese la ubicación geográfica de la inmobiliaria'
        }
      }

      if (!this.nroMatricula) {
        return {
          valid: false,
          msg: 'Ingrese el número de matrícula de martillero'
        }
      }
    }

    if (!this.telefono) {
      return {
        valid: false,
        msg: 'Ingrese su teléfono'
      }
    } else if (!/^\+{1}\d{12}$/.test(this.telefono)) {
      return {
        valid: false,
        msg: 'Ingrese un teléfono válido'
      }
    }

    return { valid: true };
  }

  setInmobiliaria(i) {
    this.inmobiliaria = i;
    this.perfil.inmobiliaria = i;
  }
}
