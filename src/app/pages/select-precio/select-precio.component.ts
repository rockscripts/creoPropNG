import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { PropiedadesService }  from '../../providers/propiedades.service';
import { UserService }         from '../../providers/user.service';
import { SiteService }         from '../../providers/site.service';

@Component({
  selector: 'app-select-precio',
  templateUrl: './select-precio.component.html',
  styleUrls: ['./select-precio.component.css']
})
export class SelectPrecioComponent implements OnInit {

  dataTarget = '';

  planes:any = [
    {'id':0, 'class':'v0', 't':'Publicación gratis', 'st':'10 avisos gratis para siempre, no se consumen',
     'en1':'VIP 0', 'en2':'10 Avisos', 'en3':'Gratis', 'bd1':'No se consumen', 'bd2':'Recomendado para dueños directos' },

    {'id':1, 'class':'v1', 't':'Avisos ilimitados', 'st':'Recomendado si posee más de 10 propiedades',
     'en1':'VIP 1', 'en2':'Avisos ilimitados', 'en3':'$100', 'bd1':'Avisos ilimitados', 'bd2':'Recomendado si posee más de 10 propiedades' },

    {'id':2, 'class':'v2', 't':'Pack avisos + destaques', 'st':'Recomendado para incrementar sus ventas',
     'en1':'VIP 2', 'en2':'Avisos ilimitados + 10 destaques', 'en3':'$770', 'bd1':'%30 de descuento', 'bd2':'Mayor presencia' },
  ];

  medios_pago:any = [];

  constructor(
    private prop:   PropiedadesService,
    private router: Router,
    private user:   UserService,
    private site:   SiteService
  ) { }

  ngOnInit() {
    if (!this.user.permiso('new-prop')){
      this.dataTarget = '#loginModal';
    } else {
      this.dataTarget = '';
    }
    //damos la señal de cambio de pagina para indicar al menu y al footer que reaccionen
    this.site.vista.next('select-plan');
  }

  siguiente(s){

  }

}
