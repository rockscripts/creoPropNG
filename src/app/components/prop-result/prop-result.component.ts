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
  @Input() propietario:any;
  @Input() mode:string       = '';
  @Input()
  pActivas: number;
  @Input()
  pInactivas: number;

  activas = 1;


  busqueda:Busqueda;
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

      this.activas = params['activo'];

      if(this.activas==null) this.activas = 1;

      if (this.propietario) {
        this.busqueda.propietario_id = this.propietario;
      }
      
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
    if(this.propiedades.length > 0){
      this.pedirBusqueda();
    }
  }
 
  onScrollUp() {
    console.log('scroll up');
  }

  edit(id){
    this.router.navigate(['/propiedad/edit/'+id]);
  } 

  delete(id){

  }


  ToogleActivas(x){
    this.router.navigate(['/mi-cuenta', {'activo': x}]);
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
      console.log(this.busqueda.page, JSON.stringify(this.busqueda.page));
      
      this.busqueda.page = this.busqueda.page ? this.busqueda.page + 1 : 1;
      if(this.busqueda.page > 1 ){
        this.propiedades = this.propiedades.concat(res);
      } else {
        this.propiedades = res;
      }
    });
  }

}
