export class Subscripcion {
  public pagadorCorreo :string = '';
  public estado        :any = '';
  public id_plan    :number = 0;
  public nombrePlan    :string = '';
  public fecha     :string = '';
  public fechaSiguientePago :string = '';
  public idPago :number = -1;
  public idUserSubscripcion :number = -1;
  public metodo :string = '';
  public monto :number = 0.0;
  public max_avisos: any = 0;
  public max_destaques: any = 0;
  public max_avisos_disponibles: any = 0;
  public max_destaques_disponibles: any = 0;
  public total_properties_published: any=0;
  public responsePayment :string = "not_setted";
  constructor
  (  ) 
  {  }

}
  