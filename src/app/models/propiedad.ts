export class Propiedad {
  public titulo: string = "";
  public direccion: string = "";
  public capacidad: number = 0;
  public dormitorios: number = 0;
  public cochera: number = 0;
  public piscina: boolean = false;
  public mascota: boolean = false;
  public seguridad: boolean = false;
  public lavarropas: boolean = false;
  public valor_dia: number = 0;
  public valor_mes: number = 0;
  public valor_semana: number = 0;
  public imgs: any = [];
  public texto: string = "";
  public ambientes_c: number = 0;
  public banios: number = 0;
  public toilette: number = 0;
  public expensas: number = 0;
  public disposicion: number = 0;
  public equipamiento: any = [];

  public moneda: number = 1;
  public moneda_simbolo: string = "";
  public precio: number = 0;
  public nombre_operacion: string = "";

  public piso: string = "";
  public dpto: string = "";
  public calle1: string = "";
  public calle2: string = "";
  public latitud: number = -33.9246855;
  public longitud: number = -64.4100692;
  public codigoPostal: number = 0;

  public tipo_propiedad_id: number = 1;
  public tipo_operacion_id: number = 0;
  public superficie_cubierta: number = 0;
  public superficie_total: number = 0;

  public ambientes: any = [];
  public servicios: any = [];
  public amenities: any = [];
  public carac_gral: any = [];
  public carac_gral_e: any = [];
  public files: any = [];

  public destacado: boolean = false;

  public tipo_plan: number = -1;
  public id: number = -1;
  public propietario_id: number = -1;
  public inmobiliaria_id: number = -1;

  public inmobiliaria: any = { logo: "", nombre: "" };
  public user: any = { celular: "", name: "", id: "", surname: "" };

  public zona_id: number = -1;
  public zona: any = [];
  public zona_nivel: number = 1;
  public nombre_zona: string = "";

  //valores posibles
  public tipo_prop: any = [
    { id: 0, nombre: "Casa" },
    { id: 1, nombre: "Departamento" }
  ];
  public tipo_op: any = [
    { id: 0, nombre: "Venta" },
    { id: 1, nombre: "Alquiler" },
    { id: 2, nombre: "Alquiler temporal" }
  ];
  public disposicion_op: any = [
    { id: 0, nombre: "Frente" },
    { id: 1, nombre: "Contrafrente" },
    { id: 2, nombre: "Interno" },
    { id: 3, nombre: "Lateral" }
  ];
  public moneda_op: any = [{ id: 2, nombre: "U$S" }, { id: 1, nombre: "AR$" }];

  constructor() {}

  public errors: string = "";

  formValid() {
    if (this.titulo == "") {
      this.errors = "El campo título es obligatorio";
      return false;
    }
    if (this.direccion == "") {
      this.errors = "El campo dirección es obligatorio";
      return false;
    }
    if (this.moneda == 0) {
      this.errors = "El campo moneda es obligatorio";
      return false;
    }
    if (this.banios == 0) {
      this.errors = "Ingresa la cantidad de baños";
      return false;
    }
    if (this.dormitorios == 0) {
      this.errors = "Ingresa la cantidad de dormitorios";
      return false;
    }
    if (this.ambientes_c == 0) {
      this.errors = "Ingresa la cantidad de ambientes";
      return false;
    }
    if (this.imgs.length == 0) {
      this.errors = "Ingresa al menos una foto de la propiedad";
      return false;
    }

    if (
      (this.tipo_operacion_id == 1 || this.tipo_operacion_id == 2) &&
      (this.valor_dia == 0 || this.valor_mes == 0 || this.valor_semana == 0)
    ) {
      this.errors = "Es necesario completar el precio";
      return false;
    }

    if (this.tipo_operacion_id == 0 && this.precio == 0) {
      this.errors = "Es necesario completar el precio";
      return false;
    }

    if (this.texto == "") {
      this.errors = "Es necesario especificar una descripción";
      return false;
    }

    return true;
  }
}
