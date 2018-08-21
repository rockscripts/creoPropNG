import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { PropiedadesService } from './../../../providers/propiedades.service';
import { DenunciaService }    from './../../../providers/denuncia.service';

@Component({
  selector: 'app-prop-detail-page',
  templateUrl: './prop-detail-page.component.html',
  styleUrls: ['./prop-detail-page.component.css']
})
export class PropDetailPageComponent implements OnInit {

  id:number;

  propiedad:any = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private propiedadService:PropiedadesService,
    private denuncia:DenunciaService
  ) {}

  ngOnInit() {
    this.propiedad[0] = {};

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this
      .propiedadService
      .getPropiedad(this.id)
      .subscribe((r) => {
        this.propiedad = r ['data'];
    });
  }

  denunciar(){
    this.denuncia.setIdProp(this.id);
    this.denuncia.showForm.next();
  }

}
