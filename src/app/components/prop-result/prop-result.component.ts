import { Component, OnInit, Input } from '@angular/core';

import { PropiedadesService } from './../../providers/propiedades.service';
import { GralInfoService }    from './../../providers/gral-info.service';
import { UserService }        from './../../providers/user.service';

@Component({
  selector: 'app-prop-result',
  templateUrl: './prop-result.component.html',
  styleUrls: ['./prop-result.component.css']
})
export class PropResultComponent implements OnInit {
  @Input() mode:string = '';

  propiedades:any = [];

  cant_prop:number;

  constructor(
    private propiedadesService: PropiedadesService,
    private gralInfoService:    GralInfoService,
    private user:               UserService
  ) { }

  edit(id){

  }

  delete(id){

  }

  ngOnInit() {
    if (this.mode == 'userProp'){ //para mostrar solo las propiedades del usuario
      this.propiedadesService.clearParams();
      this.propiedadesService.busqueda.propietario_id = this.user.getId();
    }

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
