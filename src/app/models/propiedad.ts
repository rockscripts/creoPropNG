export class Propiedad {
  public titulo:       string  = '';
  public provincia:    number  = 0;
  public localidad:    number  = 0;
  public barrio:       number  = 0;
  public direccion:    string  = '';
  public capacidad:    number  = 0;
  public dormitorios:  number  = 0;
  public destacado:    boolean = false;
  public cochera:      boolean = false;
  public piscina:      boolean = false;
  public mascota:      boolean = false;
  public seguridad:    boolean = false;
  public lavarropas:   boolean = false;
  public valor_dia:    number = 0;
  public valor_mes:    number = 0;
  public valor_semana: number = 0;
  public imgs:         any    = [];
  public texto:        string = '';
  public ambientes_c:  number = 0;
  public banios:       number = 0;
  public expensas:     number = 0;
  public disposicion:  number = 0;
  public equipamiento: any    = [];
  public moneda:       number = 0;

  public piso: string = '';
  public dpto: string = '';
  public calle1: string = '';
  public calle2: string = '';

  public tipo_propiedad_id:  number = 0;
  public tipo_operacion_id:  number = 0;
  public superficie_cubierta:number = 0;
  public superficie_total:   number  = 0;

  public ambientes:    any = [];
  public servicios:    any = [];
  public carac_gral:   any = [];
  public carac_gral_e: any = [];

  public tipo_plan: number = -1;
  public id:        number = -1;

  constructor() {}
}
