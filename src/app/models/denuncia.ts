export class Denuncia {
  public propiedad:   number = -1;
  public motivo:      number = -1;
  public descripcion: string = '';
  public denunciante: number = -1;

  constructor() {  }

  public errors = '';

  public formValid(){
  	if(this.motivo      == -1){ this.errors="Es necesario especificar un motivo"; return false; }
  	if(this.descripcion == ''){ this.errors="Es necesario especificar una descripción"; return false; }

  	return true;
  }
}
