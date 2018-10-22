import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';

import { PropiedadesService } from './../../providers/propiedades.service';
import { ZonasService }       from '../../providers/zonas.service';
import { Busqueda }           from './../../models/busqueda';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent implements OnInit, OnDestroy {

  ubicaciones:any          = {};
  tipo_operacion:any       = [];
  tipo_propiedad:any       = [];
  cant_banios:any          = [];
  ambientes:any            = [];
  cocheras:any             = [];
  dormitorios:any          = [];
  antiguedad:any           = [];
  tipos_ambientes:any      = [];
  servicios:any            = [];
  generales:any            = [];
  tanunciante:any          = [];

  provincias:any = [];
  barrios:any    = [];

  showing_ubicacion_list:string;

  public busqueda  = new Busqueda();
  public ubicacion_is_modified = false;

  private sub: any;

  constructor(
    private propiedadesService: PropiedadesService,
    private zonas: ZonasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadSearchConfig();

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.ubicacion_is_modified = false;
      this.busqueda.fromRouteParams(params);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadSearchConfig(){
    this
      .propiedadesService.getSearchConfig()
      .subscribe((r) => {
        r = r['data'];
        this.tipo_operacion       = r['tipo_operacion'];
        this.tipo_propiedad       = r['tipo_propiedad'];
        this.cant_banios          = r['cant_banios'];
        this.ambientes            = r['ambientes'];
        this.cocheras             = r['cocheras'];
        this.dormitorios          = r['dormitorios'];
        this.antiguedad           = r['antiguedad'];
        this.tipos_ambientes      = r['tipos_ambientes'];
        this.servicios            = r['servicios'];
        this.generales            = r['generales'];
        this.tanunciante          = r['tanunciante'];

        this.ubicaciones = {
          Argentina: r['ubicaciones_busqueda'][0].children,
        };
    });
  }
  
  toggleUbicacionList(ub_id) {
    if(ub_id == this.showing_ubicacion_list) {
      this.showing_ubicacion_list = null;
    } else {
      this.showing_ubicacion_list = ub_id;
    }
  }

  zonaClick(i){     /*this.busqueda.zona = i; this.goToBusqueda();*/ }
  tipoOPClick(i){   /*this.busqueda.tipoOperacion = i; this.goToBusqueda();*/ }
  tipoPropClick(i){ /*this.busqueda.tipoPropiedad = i; this.goToBusqueda();*/ }

  doBusqueda(){
    this.router.navigate(['search', this.busqueda.toRouteParams()]);
  }
}
