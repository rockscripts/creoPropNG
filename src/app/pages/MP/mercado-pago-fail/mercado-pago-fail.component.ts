import { Component, OnInit } from '@angular/core';
import { Subscripcion }  from './../../../models/subscripcion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mercado-pago-fail',
  templateUrl: './mercado-pago-fail.component.html',
  styleUrls: ['./mercado-pago-fail.component.css']
})
export class MercadoPagoFailComponent implements OnInit 
{

  subscription = new Subscripcion();
  constructor(private route: ActivatedRoute) 
  { 
    this.subscription.responsePayment = "not_setted";
  }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => 
      {
        this.subscription.responsePayment = this.route.snapshot.queryParamMap.get('reason');
      });
  }

}
