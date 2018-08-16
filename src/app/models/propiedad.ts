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
  public ambientes:    number = 0;
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

  public etapa:             number = 0;
  public tipo_techo:        number = 0;
  public largo_terreno:     number = 0;
  public frente:            number = 0;
  public luminosidad:       number = 0;
  public estado_inmueble:   number = 0;
  public cobertura_cochera: number = 0;
  public cantidad_plantas:  number = 0;
  public camas:             number = 0;
  public parque_infantil:   boolean = false;
  public pension:           number = 0;
  public entorno:           number = 0;
  public limpieza_final:    number = 0;

  public tipo_plan: number = -1;
  public id:        number = -1;

  constructor() {}
}
