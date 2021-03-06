import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';// [Modificar] esto devería ser un componente
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';


import { UserService }         from '../../providers/user.service';
import { SiteService }         from '../../providers/site.service';

import { PropiedadesService }  from '../../providers/propiedades.service';
import { MercadoPagoService }  from '../../providers/mercado-pago.service';
import { LoginModalService }   from '../../components/login-modal/login-modal.service';
import { Subscripcion }                  from './../../models/subscripcion';
import { ProfileService }          from './../../providers/profile.service';
import { SubscriptionService }          from './../../providers/subscription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-precio',
  templateUrl: './select-precio.component.html',
  styleUrls: ['./select-precio.component.css']
})
export class SelectPrecioComponent implements OnInit {

  planes:any = [
    {'id':1, 'class':'v0', 't':'Publicación gratis', 'st':'10 avisos gratis para siempre, no se consumen',
     'en1':'VIP 0', 'en2':'10 Avisos', 'en3':'Gratis', 'bd1':'No se consumen', 'bd2':'Recomendado para dueños directos' },

    {'id':2, 'class':'v1', 't':'Avisos ilimitados', 'st':'Recomendado si posee más de 10 propiedades',
     'en1':'VIP 1', 'en2':'Avisos ilimitados', 'en3':'$100', 'bd1':'Avisos ilimitados', 'bd2':'Recomendado si posee más de 10 propiedades' ,'mercadopago_url':'https://mpago.la/15TJBh'},

    {'id':3, 'class':'v2', 't':'Pack avisos + destaques', 'st':'Recomendado para incrementar sus ventas',
     'en1':'VIP 2', 'en2':'Avisos ilimitados + 10 destaques', 'en3':'$770', 'bd1':'%30 de descuento', 'bd2':'Mayor presencia' ,'mercadopago_url':'https://mpago.la/2gwpsX' },
  ];
  refreshed:any  =false;
  medios_pago:any    = [];
  registrado:boolean = false;
  planActual:number  = -1;
  planMercadoPagoURL :string = "";
  public subscription = new Subscripcion();
  private profileResponse:any = null;
  public displaySearchBar:boolean = false;

  constructor(
    private prop:    PropiedadesService,
    private router:  Router,
    private user:    UserService,
    private site:    SiteService,
    private MP:      MercadoPagoService,
    private modalLG: LoginModalService,
    private profile: ProfileService,
    private subscriptionService:SubscriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.displaySearchBar=false;
    this.route.paramMap.subscribe(params => 
      {
        this.subscription.responsePayment = this.route.snapshot.queryParamMap.get('reason');
        if(this.subscription.responsePayment=="avisos_ended")
       {}
       // console.log(this.responseReason)
      });
    //start MercadoPago payment dialog
    var script_MP = document.createElement("script");
    script_MP.src = "https://www.mercadopago.com/org-img/jsapi/mptools/buttons/render.js";
    document.body.appendChild(script_MP);

    //damos la señal de cambio de pagina para indicar al menu y al footer que reaccionen
    this.site.vista.next('select-plan');

    this.registrado = this.user.logeado();
    this.planActual = this.user.getPlanId();

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
            this.subscription.id_plan = this.profileResponse.subscripcion[0].subscripcion.id_plan;
            this.subscription.max_avisos_disponibles    = this.profileResponse.subscripcion[0].subscripcion.max_avisos_disponibles;
            this.subscription.max_destaques_disponibles = this.profileResponse.subscripcion[0].subscripcion.max_destaques_disponibles;
            this.subscription.idUserSubscripcion = this.profileResponse.subscripcion[0].pagos.id_user_membresia;
            //this.subscriptionService.reducer(this.subscription.idUserSubscripcion, 1, "max_avisos", "decrease");
            //this.subscriptionService.reducer(this.subscription.idUserSubscripcion, 1, "max_destaques", "decrease");
          }            
        }
        catch(e)
        {
          console.log(e.this.profileResponse.subscripcion);
        }         
    });
    }
  }

  siguiente(s)
  {
    if (!this.registrado)
    {
      this.modalLG.show();
    } 
    else 
    { //si ya esta registrado y se selecciona comprar vamos a mercado pago
      this.MP.comprar(s,this.user.getId()).subscribe((r) => 
      {
        if (r['error']==''){
          r = r ['data'];
          window.open(r['init_point'], '_blank'); 
        }      
      });
    }
  }
}
