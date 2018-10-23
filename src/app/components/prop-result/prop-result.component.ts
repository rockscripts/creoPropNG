import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';

import { PropiedadesService } from './../../providers/propiedades.service';
import { GralInfoService }    from './../../providers/gral-info.service';
import { Busqueda }           from './../../models/busqueda';

@Component({
  selector: 'app-prop-result',
  templateUrl: './prop-result.component.html',
  styleUrls: ['./prop-result.component.css']
})
export class PropResultComponent implements OnInit, OnDestroy {
  @Input() busqueda:Busqueda;
  @Input() mode:string       = '';

  propiedades:any = [];

  cant_prop:number     = 0;
  scrollFinish:boolean = false;

  private sub: any;

  constructor(
    private router:             Router,
    private activatedRoute:     ActivatedRoute,
    private propiedadesService: PropiedadesService,
    private gralInfoService:    GralInfoService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.propiedades = [];
      this.busqueda = new Busqueda();
      this.busqueda.fromRouteParams(params);
      this.pedirBusqueda();
    });

    this.gralInfoService.getInfo()
      .subscribe((r) => {
        r = r ['data'];
        this.cant_prop = r['cantPropiedades'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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
      this.busqueda.page = this.busqueda.page ? this.busqueda.page + 1 : 1;
    });
  }

}
