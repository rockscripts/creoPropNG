import { Component, OnInit } from '@angular/core';

import { PropiedadesService } from './../../providers/propiedades.service';
import { GralInfoService }    from './../../providers/gral-info.service';

@Component({
  selector: 'app-prop-result',
  templateUrl: './prop-result.component.html',
  styleUrls: ['./prop-result.component.css']
})
export class PropResultComponent implements OnInit {

  propiedades:any = [];

  cant_prop:number;

  constructor(
    private propiedadesService:PropiedadesService,
    private gralInfoService:GralInfoService
  ) { }

  ngOnInit() {
    this
      .propiedadesService
      .getSearch()
      .subscribe((r) => {
        this.propiedades = r['data'];
    });

    this
      .gralInfoService
      .getInfo()
      .subscribe((r) => {
        r = r ['data'];
        this.cant_prop = r['cantPropiedades'];
    });
  }

}
