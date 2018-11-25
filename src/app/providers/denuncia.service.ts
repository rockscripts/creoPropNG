import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs/Subject';

import { ConfigService }        from './config.service';
import { DenunciaModalService } from '../components/denuncia-modal/denuncia-modal.service';
import { Denuncia }             from '../models/denuncia';
import { UserService }          from '../providers/user.service';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private wsd  = 'denuncia/nueva';

  private model:Denuncia = new Denuncia();

  public showForm = new Subject();

  constructor(
    private http:   HttpClient,
    private config: ConfigService,
    private user:   UserService,
    private modal:  DenunciaModalService
  ) {
    this.showForm.subscribe({
      next: () => {
        this.modal.show();
      }
    });
  }

  nueva(){
    if(this.user.logeado()){
      this.setIdUser(this.user.getId());
    }
    return this.http.post(this.config.getAPIUrl()+this.wsd,JSON.stringify(this.model));
  }

  hideForm(){ this.modal.hide(); }

  setIdProp(i){ this.model.propiedad = i; }
  setIdUser(u){ this.model.denunciante = u; }
  setModel(d) { this.model = d; }
  getModel()  { return this.model; }
}
