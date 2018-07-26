import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { PropiedadesService } from './../../../providers/propiedades.service';

@Component({
  selector: 'app-prop-detail-page',
  templateUrl: './prop-detail-page.component.html',
  styleUrls: ['./prop-detail-page.component.css']
})
export class PropDetailPageComponent implements OnInit {

  id:number;

  propiedad:any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private propiedadService:PropiedadesService,
  ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this
      .propiedadService
      .getPropiedad(this.id)
      .subscribe((r) => {
        this.propiedad = r ['data'];
    });
  }

}
