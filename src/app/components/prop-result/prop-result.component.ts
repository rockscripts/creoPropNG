import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GralInfoService } from './../../providers/gral-info.service';
import { PropiedadesService } from './../../providers/propiedades.service';
import { Busqueda } from './../../models/busqueda';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Pagination } from '../../models/pagination';
import { environment } from '../../../environments/environment';
import { AppliedFiltersService } from '../../providers/applied-filters.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-prop-result',
  templateUrl: './prop-result.component.html',
  styleUrls: ['./prop-result.component.css']
})
export class PropResultComponent implements OnInit {
  @ViewChild('content') content;
  @Input() propietario: any;
  @Input() mode: string = '';
  @Input() pActivas: number;
  @Input() pInactivas: number;
  @Input() listMode: boolean = false;
  @Input() showInProfile: boolean = false;
  @Input() AppliedFilters: any[] = [];

  activas: number = 1;
  busqueda: Busqueda;
  propiedades: any = [];
  cant_prop: number = 0;
  scrollFinish: boolean = false;
  panelCheckboxState: number = 0;
  alertType: string = '';
  pagination: Pagination;
  mainCheckState: number = 2;

  public searchResultText: string;

  private _onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private propiedadesService: PropiedadesService,
    private gralInfoService: GralInfoService,
    private modalService: NgbModal,
    private filterService: AppliedFiltersService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.propiedades = [];
        this.busqueda = new Busqueda();
        this.busqueda.fromRouteParams(params);
        this.activas = params['activo'];

        if (this.activas == null) this.activas = 1;

        if (this.propietario) {
          this.busqueda.propietario_id = this.propietario;
        }

        this.pedirBusqueda();
      });

    this.gralInfoService.getInfo()
      .subscribe((r) => {
        r = r['data'];
        this.cant_prop = r['cantPropiedades'];
      });

    this.filterService.onAppliedFilters
      .pipe(takeUntil(this._onDestroy))
      .subscribe((filters: any[]) => {
        if (filters.length) {
          let text = '';

          let propietyType = filters.find(filter => filter.key === "tipoPropiedad");
          text += propietyType ? propietyType.label : 'Propiedades';

          let ambientes = filters.find(filter => filter.key === "ambientes");
          text += ambientes ? ` con ${ambientes.value} ambientes` : '';

          let dormitorios = filters.find(filter => filter.key === "dormitorios");
          text += dormitorios ? ` con ${dormitorios.value} dormitorios` : '';

          let sanitarios = filters.find(filter => filter.key === "cantidadBanios");
          text += sanitarios ? ` con ${sanitarios.value} baños` : '';

          let cocheras = filters.find(filter => filter.key === "cocheras");
          text += cocheras ? ` con ${cocheras.value} cocheras` : '';

          let tipoAmbientes = filters.filter(filter => filter.key === "tipoAmbiente");

          if (tipoAmbientes.length) {
            text += ' con ' + tipoAmbientes[0].label;

            if (tipoAmbientes.length > 1) {
              tipoAmbientes.slice(1).forEach(ambiente => {
                text += ' y ' + ambiente.label;
              });
            }
          }

          let servicios = filters.filter(filter => filter.key === "servicios");

          if (servicios.length) {
            text += ' con ' + servicios[0].label;

            if (servicios.length > 1) {
              servicios.slice(1).forEach(servicio => {
                text += ' y ' + servicio.label;
              });
            }
          }

          let generales = filters.filter(filter => filter.key === "generales");

          if (generales.length) {
            text += ' con ' + generales[0].label;

            if (generales.length > 1) {
              generales.slice(1).forEach(general => {
                text += ' y ' + general.label;
              });
            }
          }

          let superficie = filters.find(filter => filter.key === "superficie");
          text += superficie ? ` de ${Number(superficie.value.split('-')[0]).toLocaleString('es-ES')} a ${Number(superficie.value.split('-')[1]).toLocaleString('es-ES')}  m²` : '';

          let precio = filters.find(filter => filter.key === "precio");
          text += precio ? ` de $${Number(precio.value.split('-')[0]).toLocaleString('es-ES')} a $${Number(precio.value.split('-')[1]).toLocaleString('es-ES')}` : '';

          let expensas = filters.find(filter => filter.key === "expensas");
          text += expensas ? ` con expensas de $${Number(expensas.value.split('-')[0]).toLocaleString('es-ES')} a $${Number(expensas.value.split('-')[1]).toLocaleString('es-ES')}` : '';

          let operationType = filters.find(filter => filter.key === "tipoOperacion");
          text += operationType ? ' en ' + operationType.label : '';

          let provincia = filters.find(filter => filter.key === "ubicacion_provincia");
          let city = filters.find(filter => filter.key === "ubicacion_partido");
          let location = filters.filter(filter => filter.key === "ubicacion");

          if (location.length) {
            text += ' en ' + location[0].label;

            if (location.length > 1) {
              location.slice(1).forEach(dir => {
                text += ' o ' + dir.label;
              });
            }
          } else if (city) {
            text += ' en ' + city.label;
          } else if (provincia) {
            text += ' en ' + provincia.label;
          } else {
            text += ' en Argentina';
          }

          let anunciante = filters.find(filter => filter.key === "tipoAnunciante");
          anunciante ? text += ' , ' + anunciante.label : '';

          this.searchResultText = text;
        } else {
          this.searchResultText = null;
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  edit(id) {
    this.router.navigate(['/propiedad/edit/' + id]);
  }

  delete(id: number, propietyState: number) {
    this.alertType = `${+propietyState ? 'desactivar' : 'eliminar'} esta propiedad`;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.propiedadesService.delete(id)
          .subscribe(res => {
            this.pedirBusqueda(true);
            this.propiedadesService.getCountsPropiedades(this.propietario)
              .subscribe(res => {
                this.pActivas = res['data']['pActivas'];
                this.pInactivas = res['data']['pInactivas'];
              });
          }, err => {
            console.log(err)
          });

      }, (reason) => {
        console.log(`Dismissed`);
      });
  }

  deleteAllSelecteds(propietyState: number) {
    this.alertType = `${+propietyState ? 'desactivar' : 'eliminar'} las propiedades seleccionadas`;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        let request = this.propiedades
          .filter(prop => prop.isSelected)
          .map(prop => {
            return this.propiedadesService.delete(+prop.id);
          })

        forkJoin(request)
          .subscribe(res => {
            this.pedirBusqueda(true);
            this.propiedadesService.getCountsPropiedades(this.propietario)
              .subscribe(res => {
                this.pActivas = res['data']['pActivas'];
                this.pInactivas = res['data']['pInactivas'];
              });
          }, err => {
            console.log(err);
          });

      }, (reason) => {
        console.log(`Dismissed`);
      });
  }

  destacar(id: number) {
    let propiedad = this.propiedades.find(prop => +prop.id === +id)
    propiedad.destacado = propiedad.destacado ? 0 : 1;

    this.propiedadesService.destacar(id)
      .subscribe(res => {
        this.pedirBusqueda(true);
      }, err => {
        console.log(err)
      });
  }

  destacarAllSelecteds() {
    let request = this.propiedades
      .filter(prop => prop.isSelected)
      .map(prop => {
        prop.destacado = prop.destacado ? 0 : 1;
        return this.propiedadesService.destacar(+prop.id);
      });

    console.log(request)

    forkJoin(request)
      .subscribe(res => {
        this.pedirBusqueda(true);
      }, err => {
        console.log(err);
      });
  }


  ToogleActivas(x) {
    this.router.navigate(['/mi-cuenta', { 'activo': x }]);
  }

  nextPage(reset: boolean = false) {
    this.pedirBusqueda(reset, null, this.pagination.next);
  }

  prevPage(reset: boolean = false) {
    this.pedirBusqueda(reset, null, this.pagination.prev);
  }

  filterByTypeOperatioon(id: number): void {
    this.pedirBusqueda(true, "destacados", 0, (+id) === -1 ? null : id);
  }

  pedirBusqueda(reset: boolean = false, orderBy?: string, page?: number, typeOperation?: number) {
    if (reset) {
      this.busqueda.page = 0;
      this.busqueda.tipoOperacion = 0;
      this.busqueda.orderBy = "destacados";
      this.propiedades = [];
    }

    this.busqueda.orderBy = orderBy ? orderBy : this.busqueda.orderBy ? this.busqueda.orderBy : "destacados";
    this.propiedadesService.busqueda = this.busqueda;

    if (page) {
      this.busqueda.page = page;
    }

    if (typeOperation) {
      this.busqueda.tipoOperacion = typeOperation;
    }

    this.propiedadesService.getSearch()
      .subscribe(r => {
        let data = r['data'].map(prop => {
          /*prop.files.push({
            nombre: 'googlemapimage',
            url: `https://maps.googleapis.com/maps/api/staticmap?center=${prop.latitud},${prop.longitud}&markers=color:red%7Clabel:C%7C${prop.latitud},${prop.longitud}&zoom=12&size=600x400&key=${environment.googleApiKey}`
          });*/

          return prop;
        });

        this.pagination = r['pagination'];

        if (!data.length && !Object.keys(this.busqueda).includes('page')) {
          this.propiedades = [];
          return;
        }

        if (this.busqueda.page > 1) {
          this.propiedades = this.propiedades.concat(data);
        } else {
          this.propiedades = data;
        }

        this.propiedades = this.propiedades.map(prop => {
          prop.isSelected = false;
          prop.destacado = +prop.destacado;
          prop.rowActive = false;
          return prop;
        });
      });
  }

  hasRowSelecteds(): boolean {
    return this.propiedades.filter(prop => prop.isSelected).length;
  }

  setPanelCheckState(state: number) {
    this.propiedades
      .forEach(prop => {
        prop.isSelected = state === 1 ? false : true;
      });
  }

  showCheckIconState(): string {
    let allSelected = this.propiedades.every(item => item.isSelected);
    let allUncheck = this.propiedades.every(item => !item.isSelected);

    this.mainCheckState = allUncheck ? 2 : 1;

    return allUncheck ? 'check_box_outline_blank' : allSelected ? 'check_box' : 'indeterminate_check_box';
  }
}
