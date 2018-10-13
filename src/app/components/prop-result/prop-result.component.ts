import { Component, OnInit, Input } from '@angular/core';
import { Router }                   from '@angular/router';

import { PropiedadesService } from './../../providers/propiedades.service';
import { GralInfoService }    from './../../providers/gral-info.service';
import { Busqueda }           from './../../models/busqueda';

@Component({
  selector: 'app-prop-result',
  templateUrl: './prop-result.component.html',
  styleUrls: ['./prop-result.component.css']
})
export class PropResultComponent implements OnInit {
  @Input() busqueda:Busqueda = new Busqueda();
  @Input() mode:string       = '';

  propiedades:any = [];

  cant_prop:number     = 0;
  scrollFinish:boolean = false;

  constructor(
    private router:             Router,
    private propiedadesService: PropiedadesService,
    private gralInfoService:    GralInfoService
  ) { }

  onScrollDown() {
    this.pedirBusqueda();
  }
 
  onScrollUp() {
    console.log('scroll up');
  }

  edit(id){
    this.router.navigate(['/propiedad/edit/'+id]);
  }

  delete(id){

  }

  private pedirBusqueda(){
    this.propiedadesService.busqueda = this.busqueda;

    this.propiedadesService.getSearch()
    .subscribe((r) => {
      let res = r['data'];
      if (res.length == 0){
        this.scrollFinish = true;
        console.log('sscs');
        return true;
      }
      this.propiedades   = this.propiedades.concat(res);
      this.busqueda.page += 1;
    });
  }

  ngOnInit() {
    this.pedirBusqueda();

    this.gralInfoService.getInfo()
      .subscribe((r) => {
        r = r ['data'];
        this.cant_prop = r['cantPropiedades'];
    });
  }

}
