import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PropiedadesService } from './../../providers/propiedades.service';
import { GralInfoService } from './../../providers/gral-info.service';
import { Busqueda } from './../../models/busqueda';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

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

  activas: number = 1;
  busqueda: Busqueda;
  propiedades: any = [];
  cant_prop: number = 0;
  scrollFinish: boolean = false;
  panelCheckboxState: number = 0;
  alertType: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private propiedadesService: PropiedadesService,
    private gralInfoService: GralInfoService,
    private modalService: NgbModal
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
  }

  // ngOnDestroy() {}

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
        let request = this.propiedades.map(prop => {
          if (prop.isSelected) {
            return this.propiedadesService.delete(+prop.id);
          }
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
    let request = this.propiedades.map(prop => {
      if (prop.isSelected) {
        return this.propiedadesService.destacar(+prop.id);
      }
    })

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

  nextPage() {
    alert('en desarrollo next');
  }

  prevPage() {
    alert('en desarrollo prev');
  }

  pedirBusqueda(reset: boolean = false, orderBy?: string) {
    if (reset) {
      delete this.busqueda.page;
    }

    this.busqueda.orderBy = orderBy ? orderBy : '';
    this.propiedadesService.busqueda = this.busqueda;

    this.propiedadesService.getSearch()
      .subscribe(r => {
        let res = r['data'];

        if (!res.length && !Object.keys(this.busqueda).includes('page')) {
          this.propiedades = [];
          return;
        }

        this.busqueda.page = this.busqueda.page ? this.busqueda.page + 1 : 1;

        if (this.busqueda.page > 1) {
          this.propiedades = this.propiedades.concat(res);
        } else {
          this.propiedades = res;
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
      .filter(prop => prop.isSelected)
      .forEach(prop => {
        prop.isSelected = state === 1 ? false : true;
      });
  }
}
