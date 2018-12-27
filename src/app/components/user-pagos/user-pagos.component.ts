import { Component, OnInit } from '@angular/core';
import { MercadoPagoService } from './../../providers/mercado-pago.service';
import { ProfileService }          from './../../providers/profile.service';
import { SubscriptionService }          from './../../providers/subscription.service';
import { UserService }       from './../../providers/user.service';
import { Perfil }                  from './../../models/perfil';
import { Subscripcion }                  from './../../models/subscripcion';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-pagos',
  templateUrl: './user-pagos.component.html',
  styleUrls: ['./user-pagos.component.css']
})
export class UserPagosComponent implements OnInit 
{
  public subscription = new Subscripcion();
  private profileResponse:any = null;
  private pagosHistorial:any = null;

  constructor(private MP:MercadoPagoService,	
              private user: UserService,
              private profile: ProfileService,
              private profileSubscription : SubscriptionService
              ) 
  { 
    
  }

  ngOnInit() 
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
            this.subscription.pagadorCorreo = this.profileResponse.subscripcion[0].subscripcion.email_pagador;
            
            if(this.profileResponse.subscripcion[0].subscripcion.estado=="authorized")
               this.subscription.estado = "Activo"
            else if(this.profileResponse.subscripcion[0].subscripcion.estado=="paused")
               this.subscription.estado = "Pausado";
            else if(this.profileResponse.subscripcion[0].subscripcion.estado=="cancelled")
               this.subscription.estado = "Cancelado"
            else if(this.profileResponse.subscripcion[0].subscripcion.estado=="pending")
               this.subscription.estado = "Pendiente"
            
            if(this.profileResponse.subscripcion[0].subscripcion.max_avisos>=0)
              this.subscription.max_avisos = this.profileResponse.subscripcion[0].subscripcion.max_avisos;
            else if(this.profileResponse.subscripcion[0].subscripcion.max_avisos==-1)
              this.subscription.max_avisos = "Ilimitado";

            if(this.profileResponse.subscripcion[0].subscripcion.max_destaques>=0)
              this.subscription.max_destaques = this.profileResponse.subscripcion[0].subscripcion.max_destaques;
            else if(this.profileResponse.subscripcion[0].subscripcion.max_destaques==-1)
              this.subscription.max_destaques = "Ilimitado";

            this.subscription.total_properties_published = this.profileResponse.subscripcion[0].subscripcion.total_properties_published;
              
            this.subscription.max_avisos_disponibles = this.profileResponse.subscripcion[0].subscripcion.max_avisos_disponibles;
            this.subscription.max_destaques_disponibles = this.profileResponse.subscripcion[0].subscripcion.max_destaques_disponibles;

            this.subscription.id_plan = this.profileResponse.subscripcion[0].subscripcion.id_plan;
            this.subscription.nombrePlan = this.profileResponse.subscripcion[0].subscripcion.nombre_plan;
            this.subscription.idPago = this.profileResponse.subscripcion[0].pagos.id;
            this.subscription.idUserSubscripcion = this.profileResponse.subscripcion[0].pagos.id_user_membresia;

            this.subscription.fecha = this.profileResponse.subscripcion[0].pagos.fecha;
            var dateFirstPayment =new Date(this.subscription.fecha);
            dateFirstPayment.setMonth(dateFirstPayment.getMonth() + 1);
            this.subscription.fechaSiguientePago = dateFirstPayment.getFullYear()+"-"+(dateFirstPayment.getMonth()+1)+"-"+dateFirstPayment.getUTCDate();

            if(this.profileResponse.subscripcion[0].pagos.metodo=="mercadopago") 
            this.subscription.metodo = "Mercado Pago";
            this.subscription.monto = this.profileResponse.subscripcion[0].pagos.monto; 
             
            console.log(this.subscription)
          }
            
        }   
        catch(e)
        {
          //if no any subscription, subscribe to default plan
          //Happens if new user or has no a subscription assigned
          this.profileSubscription.addDefaultProfileSubscription(this.user.getId());
          this.ngOnInit();
        }         
    });
  } 
  hidePaymentsHistory()
  {
    var containerHistorial   = document.getElementById("historial-pagos");
    var containerPlanActual  = document.getElementById("plan-beneficio-container");
    var buttonDisplayHistory = document.getElementById("display-payments-history");         
    var buttonHideHistory    = document.getElementById("hide-payments-history");
    containerHistorial.style.display   = "none";
    buttonHideHistory.style.display    = "none";
    buttonDisplayHistory.style.display = "block";
    containerPlanActual.style.display  = "block";
    
  }
  displayPaymentsHistory()
  {
   this.profileSubscription.displayPaymentsHistory(this.user.getId(),"mercadopago").subscribe((r) => 
   {
     try
     {
      if(!r || !r["data"])
      {
        return;
      }
         this.profileResponse = r["data"];
         this.pagosHistorial = this.profileResponse["historial"];
         var length = this.profileResponse["length"];
         var tbody = document.getElementById("history-payment");
         
         var containerHistorial = document.getElementById("historial-pagos");
         var containerPlanActual = document.getElementById("plan-beneficio-container");
         var buttonDisplayHistory = document.getElementById("display-payments-history");         
         var buttonHideHistory = document.getElementById("hide-payments-history");
         
         tbody.innerHTML = '';
         if(length>0)
         {
          this.pagosHistorial.reverse();
          for(var i=0;i<length;i++)
          {
            console.log(this.pagosHistorial[i]);
            var fecha =new Date(this.pagosHistorial[i].fecha);
            var fechaFormatted = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getUTCDate()+" "+fecha.getHours()+':'+fecha.getMinutes();
            if(this.pagosHistorial[i].estado=="approved")
            {
              var estado = '<i class="fa fa-check-circle icon-subscription-active"></i>&nbsp;Aprobado';
            }
            else
            {
              var estado = '<i class="fa fa-ban icon-subscription-ban"></i>&nbsp;cancelado';
            }
            var tr = '<tr><td>'+this.pagosHistorial[i].id+'</td><td>'+this.pagosHistorial[i].nombre+'</td><td>'+this.pagosHistorial[i].concepto+'</td><td>'+estado+'</td><td>'+this.pagosHistorial[i].monto+'</td><td>'+fechaFormatted+'</td></tr>';
            tbody.innerHTML += tr;
          }
          buttonDisplayHistory.style.display = "none";
          containerPlanActual.style.display = "none";
          containerHistorial.style.display = "block";
          buttonHideHistory.style.display = "block";
         }
         else
         {
          var tr = '<tr><td colspan="6">Sin Registros</td></tr>';
          tbody.innerHTML = tr;
         }
         
     }
     catch(e)
     {
       console.log(e)
       console.log("ERROR DISPLAYING HISTORY")
     }     
   });


   
   //   .subscribe((r) => 
   //   {
   //     try
   //     {
   //      this.pagosHistorial = r;
   //      this.pagosHistorial = JSON.parse(this.pagosHistorial);
   //      var historial = this.pagosHistorial['historial'];
   //      var length = this.pagosHistorial['length'];
   //      console.log("length "+length)
   //      console.log("historial "+historial)
   //     }
   //     catch(e)
   //     {
   //       console.log("ERROR DISPLAYING HISTORY")
   //     }     
   //   });
  // ;
  // if(!r){
  //  return;
  //}
  //this.pagosHistorial = r;
   //console.log(this.pagosHistorial);
   //this.pagosHistorial = this.profileSubscription.response;
   //console.log("IN")
   ////this.pagosHistorial = JSON.parse(this.pagosHistorial);
   //console.log(this.profileSubscription.response)
   //var historial = this.pagosHistorial['historial'];
   //var length = this.pagosHistorial['length'];
   //console.log(this.pagosHistorial)
   //var tbody = document.getElementById("history-payment");
   //for(var i=0;i<length;i++)
   //{
   // console.log(historial[i]);
   //}
  }
  darBajaSubscripcion(event,id_user_membresia)
  {
    swal({
      title: 'Dar de baja la subscripción!',
      text: 'Vamos a subscribirte en nuestro plan gratuito',
      type: 'error',
      confirmButtonText: 'Si, dar de baja',
      cancelButtonText: 'No, dejar activa',
      showCancelButton:true 
    }).then((result) => 
    {
      if (result.value) 
      {
        this.profileSubscription.darBajaPlan(id_user_membresia,"cancelled");
      } 
      else if (result.dismiss === swal.DismissReason.cancel) 
      {
       
      }
    });
   
  }
  darPausarSubscripcion(event,id_user_membresia)
  {
    swal({
          title: 'Pausar Subscripcion!',
          text: 'Vamos a desactivar tus publicaciones activas y no vas a poder publicar hasta que sea activada de nuevo',
          type: 'warning',
          confirmButtonText: 'Si, pausar',
          cancelButtonText: 'No, dejar activa',
          showCancelButton:true 
        }).then((result) => 
        {
          if (result.value) 
          {
            this.profileSubscription.darBajaPlan(id_user_membresia,"paused");
          } 
          else if (result.dismiss === swal.DismissReason.cancel) 
          {
           
          }
        });
  }
  darActivarSubscripcion(event,id_user_membresia)
  {
   
   this.profileSubscription.darBajaPlan(id_user_membresia,"authorized");
  }
}
