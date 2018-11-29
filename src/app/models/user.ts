import { Perfil } from './perfil'; //[modificar] los datos del usuario (como nombre, telefono, etc) deverian formar parte del perfil
import { Inmobiliaria } from './inmobiliaria';

export class User {
  public id: number = -1;
  public token: string = '';

  public email: string = '';
  public pass: string = '';
  public nombre: string = '';
  public apellido: string = '';
  public telefono: string = '';
  public tipo_user_id: number = 0;
  // public telFijo: string = '';
  // public dni: string = '';
  // public cuit: string = '';

  public membresia: string = '';
  public membresia_id: number = 0;
  public id_inmobiliaria: number = 0;
  public inmobiliaria: Inmobiliaria = new Inmobiliaria();
  public perfil: Perfil = new Perfil();

  //nuevas keys perfil privado
  name: string;
  surname: string;
  password: string;
  celular: string = '';
  matricula: string = '';
  oficina: string = '';

  public formValid() {
    if (!this.email) {
      return {
        valid: false,
        msg: 'Ingrese su email'
      }
    } else if (!/^[a-zA-Z](\w|\.)+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email)) {
      return {
        valid: false,
        msg: 'Ingrese un email válido'
      }
    }

    if (!this.password) {
      return {
        valid: false,
        msg: 'Ingrese una contraseña'
      }
    } else if (this.password.length < 6) {
      return {
        valid: false,
        msg: 'La contraseña debe contener al menos 6 caracteres'
      }
    }

    if (!this.name) {
      return {
        valid: false,
        msg: 'Ingrese su nombre'
      }
    }

    if ([2, 3].includes(+this.tipo_user_id)) {
      if (!this.surname) {
        return {
          valid: false,
          msg: 'Ingrese su apellido'
        }
      }

      if (this.tipo_user_id == 2 && !this.inmobiliaria.nombre) {
        return {
          valid: false,
          msg: 'Ingrese el nombre de la inmobiliaria a la que pertenece'
        }
      }

      if (this.tipo_user_id == 2 && !this.inmobiliaria.direccion) {
        return {
          valid: false,
          msg: 'Ingrese la ubicación geográfica de la inmobiliaria'
        }
      }

      if (this.tipo_user_id == 3 && !this.id_inmobiliaria) {
        return {
          valid: false,
          msg: 'Seleccione la inmobiliaria a la que pertenece'
        }
      }

      if (!this.matricula) {
        return {
          valid: false,
          msg: 'Ingrese el número de matrícula de martillero'
        }
      }
    }

    if (!this.celular) {
      return {
        valid: false,
        msg: 'Ingrese su número de teléfono movil'
      }
    } else if (!/^\+{1}\d{12}$/.test(this.celular)) {
      return {
        valid: false,
        msg: 'Ingrese un número de teléfono válido'
      }
    }

    return { valid: true };
  }

  setInmobiliaria(i) {
    this.inmobiliaria = i;
    this.perfil.inmobiliaria = i;
  }
}
