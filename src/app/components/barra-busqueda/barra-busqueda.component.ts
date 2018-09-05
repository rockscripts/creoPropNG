import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { PropiedadesService } from './../../providers/propiedades.service';
import { ZonasService }       from '../../providers/zonas.service';
import { Busqueda }           from './../../models/busqueda';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent implements OnInit {

  ubicaciones_busqueda:any = [];
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

  public busqueda = new Busqueda();
  modificado:boolean = false;

  constructor(
    private propiedadesService:PropiedadesService,
    private zonas:ZonasService,
    private router:Router
  ) {}

  ngOnInit() {

    this.loadSearchConfig();

  /*  this
      .zonas.getProvincias()
      .subscribe((r) => {
        this.provincias         = r['data'];
        this.busqueda.provincia = 1;
    });

    this
      .zonas.getBarrios(1)
      .subscribe((r) => {
        this.barrios = r['data'];
    });*/
  }

  loadSearchConfig(){
    if(this.modificado){
      this.propiedadesService.busqueda = this.busqueda;
    }
    this
      .propiedadesService.getSearchConfig()
      .subscribe((r) => {
        r = r['data'];
        this.ubicaciones_busqueda = r['ubicaciones_busqueda'];
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
    });
  }

  updateUbicaciones(){
    this.modificado = true;
    this.loadSearchConfig();
  }

  ciudadClick(i){   this.busqueda.localidad = i; this.goToBusqueda(i); }
  tipoOPClick(i){   this.busqueda.tipoOperacion = i; this.goToBusqueda(i); }
  tipoPropClick(i){ this.busqueda.tipoPropiedad = i; this.goToBusqueda(i); }

  goToBusqueda(t){
    this.propiedadesService.busqueda = this.busqueda;
    this.router.navigate(['./search/'+t]);
  }
}
