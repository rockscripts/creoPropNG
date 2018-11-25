import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { PropiedadesService }  from '../../../providers/propiedades.service';
import { UserService }         from '../../../providers/user.service';
import { Subscripcion }                  from './../../../models/subscripcion';
import { ProfileService }          from './../../../providers/profile.service';
import { SubscriptionService }          from './../../../providers/subscription.service';
@Component({
  selector: 'app-nueva-prop-ok',
  templateUrl: './nueva-prop-ok.component.html',
  styleUrls: ['./nueva-prop-ok.component.css']
})
export class NuevaPropOkComponent implements OnInit 
{
  public subscription = new Subscripcion();
  private profileResponse:any = null;
  titulo:string;
  id:any;
  destacado:any;
  registrado:boolean = false;
  constructor(
              private activatedRoute:ActivatedRoute,
              private prop:   PropiedadesService,
              private profile: ProfileService,
              private user:    UserService,
              private subscriptionService:SubscriptionService
             ) {  this.registrado = this.user.logeado(); }

  ngOnInit() 
  {
    this.titulo = this.prop.getModel().titulo;
    this.id     = this.prop.getModel().id;
    this.destacado     = this.prop.getModel().destacado;
    this.profile.getProfile(this.user.getId()).subscribe((r) => 
    {
      if(!r || !r["data"]){
        return;
      }
         this.profileResponse = r["data"];
        try
        {
          if(this.profileResponse.subscripcion!=null)
          {
            this.subscription.idUserSubscripcion = this.profileResponse.subscripcion[0].pagos.id_user_membresia;
           // this.subscriptionService.reducer(this.subscription.idUserSubscripcion, 1, "max_avisos", "decrease");
          } 
          this.subscription.id_plan = this.profileResponse.subscripcion[0].subscripcion.id_plan;
          if(this.subscription.id_plan == 3)   
          {
            if(this.destacado)
            {
              this.subscriptionService.reducer(this.subscription.idUserSubscripcion, 1, "max_destaques", "decrease");
            }
          }        
        }
        catch(e)
        {
          console.log(e.this.profileResponse.subscripcion);
        }         
    });
   
  }

}
