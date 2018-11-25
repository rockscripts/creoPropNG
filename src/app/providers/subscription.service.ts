import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

import { ConfigService } from './config.service';
import { Perfil }        from './../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService 
{
  private wss    = 'pago/subscribe';
  private wsr    = 'pago/reducer';
  private wsrdb  = 'pago/darbaja';
  private wsrh  = 'pago/historial';
  public response: any;

  constructor(
                private http:   HttpClient,
                private config: ConfigService
             ) 
              {}

  addDefaultProfileSubscription(id_user)
  { 
    
    this.http.post(this.config.getAPIUrl()+this.wss,{'id_user':id_user, 'id_plan':1, 'type':"default"}).subscribe((r) => {
      r = r['data'];
      console.log(r)
    });
  }
  displayPaymentsHistory(id_user, metodo)
  {
    this.response = this.http.post(this.config.getAPIUrl()+this.wsrh,{'id_user':id_user, "metodo":metodo});
    return this.response;
  }
  darBajaPlan(id_user_membresia, status)
  {
    this.http.post(this.config.getAPIUrl()+this.wsrdb,{'id_user_membresia':id_user_membresia, "status":status}).subscribe((r) => 
    {
      try
      {
        window.location.reload();
      }
      catch(e)
      {
        window.location.reload();
      }
      r = r['data'];
      //window.location.reload();
     
    });
   
  }
  reducer(id_user_membresia,count,which,type)
  {     
    this.http.post(this.config.getAPIUrl()+this.wsr,{'id_user_membresia':id_user_membresia, 'count':count,"field":which,"type":type}).subscribe((r) => 
    {
      r = r['data'];
    
    });
  }
}
