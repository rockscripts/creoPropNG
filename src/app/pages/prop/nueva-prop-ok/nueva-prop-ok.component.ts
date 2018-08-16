import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { PropiedadesService }  from '../../../providers/propiedades.service';

@Component({
  selector: 'app-nueva-prop-ok',
  templateUrl: './nueva-prop-ok.component.html',
  styleUrls: ['./nueva-prop-ok.component.css']
})
export class NuevaPropOkComponent implements OnInit {

  titulo:string;
  id:any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private prop:   PropiedadesService
  ) { }

  ngOnInit() {
    this.titulo = this.prop.getModel().titulo;
    this.id     = this.prop.getModel().id;
  }

}
