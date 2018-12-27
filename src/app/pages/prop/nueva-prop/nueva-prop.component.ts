import { Component, OnInit } from '@angular/core';
import { ProfileService }          from './../../../providers/profile.service';
import { UserService }         from '../../../providers/user.service';
import { Subscripcion }                  from './../../../models/subscripcion';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-prop',
  templateUrl: './nueva-prop.component.html'
})
export class NuevaPropComponent implements OnInit {


  public subscription = new Subscripcion();
  private profileResponse:any = null;
  registrado:boolean = false;

  constructor(    private profile: ProfileService,private user:    UserService
  ) 
  { 
    this.registrado = this.user.logeado();
  }

  ngOnInit() 
  {
    
    if(this.registrado)
    {
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
            this.subscription.estado = this.profileResponse.subscripcion[0].subscripcion.estado;
            this.subscription.id_plan = this.profileResponse.subscripcion[0].subscripcion.id_plan;
            if(this.subscription.id_plan == 1)
            {
              this.subscription.max_avisos = this.profileResponse.subscripcion[0].subscripcion.max_avisos;
              this.subscription.total_properties_published = this.profileResponse.subscripcion[0].subscripcion.total_properties_published;
              
              console.log(this.subscription.total_properties_published +" - >= - "+this.subscription.max_avisos);
              if(parseInt(this.subscription.total_properties_published) >= parseInt(this.subscription.max_avisos))
              { 
                swal({ 
                  title: 'Estas Avanzando!',
                  text: 'Tienes '+this.subscription.total_properties_published+' de '+this.subscription.max_avisos+' propiedades publicadas. Da un paso más y subscribete para publicar ilimitadamente!',
                  type: 'warning',
                  confirmButtonText: 'Aceptar'
                })  
                window.location.href = "#/select-plan?reason=reason=avisos_ended";
              }                         
            } 
            else
            {
              console.log("estado: "+this.subscription.estado)
              if(this.subscription.estado=="paused")
              {                 
                window.location.href = "#/mi-cuenta?reason=paused";
              }
            }                        
          }            
        }
        catch(e)
        {
        }         
    });
    }
  }
}
