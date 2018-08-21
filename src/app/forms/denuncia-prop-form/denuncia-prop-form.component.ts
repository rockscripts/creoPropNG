import { Component, OnInit } from '@angular/core';

import { Denuncia }         from '../../models/denuncia';
import { DenunciaService }  from '../../providers/denuncia.service';
import { TextsService }     from '../../providers/texts.service';
import { AlertService }     from '../../components/alert/alert.service';

@Component({
  selector: 'app-denuncia-prop-form',
  templateUrl: './denuncia-prop-form.component.html',
  styleUrls: ['./denuncia-prop-form.component.css']
})
export class DenunciaPropFormComponent implements OnInit {

  motivos_denuncia = [
    {"id":"0","nombre":"Es un intento de estafa"},
    {"id":"1","nombre":"Está repetido"},
    {"id":"2","nombre":"Datos incorrectos"},
    {"id":"3","nombre":"El inmueble ya está alquilado o vendido"},
    {"id":"4","nombre":"Otro motivo"},
  ];

  model:any = new Denuncia();

  constructor(
    private denuncia: DenunciaService,
    private alert:    AlertService,
    private texts:    TextsService
  ) { }

  ngOnInit() {
    this.model = this.denuncia.getModel();
  }

  denunciar(){
    this.denuncia.nueva().subscribe(
      (r) => {
        if (r['errors'] == ''){
          this.alert.showSuccess(this.texts.eDenunOk);
          this.denuncia.hideForm();
        } else {
          this.alert.show(this.texts.eBadReq);
        }
    });
  }

  dismiss(){
    
  }

}
