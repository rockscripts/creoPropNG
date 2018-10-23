import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PropiedadesService } from "./../../providers/propiedades.service";
import { ZonasService } from "../../providers/zonas.service";
import { Busqueda } from "./../../models/busqueda";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-barra-busqueda",
  templateUrl: "./barra-busqueda.component.html",
  styleUrls: ["./barra-busqueda.component.css"]
})
export class BarraBusquedaComponent implements OnInit, OnDestroy {
  public searchConfig: any;

  public busqueda = new Busqueda();
  public ubicacion_is_modified = false;

  public appliedFilters: any = [];

  private sub: any;

  constructor(
    private propiedadesService: PropiedadesService,
    private zonas: ZonasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.loadSearchConfig()
        .then(() => {
          this.ubicacion_is_modified = false;
          this.busqueda.fromRouteParams(params);

          if (this.busqueda.ubicacion_padre) {
            for (const ub of this.searchConfig.ubicaciones_padres.Argentina) {
              if (ub.value === this.busqueda.ubicacion_padre && ub.children) {
                this.searchConfig.ubicaciones_hijas = ub.children;
              }
            }
          }

          this.getAppliedFilters();
        })
        .catch();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadSearchConfig() {
    return new Promise((resolve, reject) => {
      if (!this.searchConfig) {
        this.propiedadesService.getSearchConfig().subscribe(
          response => {
            const data = response["data"];
            this.searchConfig = {
              tipoOperacion: data["tipoOperacion"],
              tipoPropiedad: data["tipoPropiedad"],
              cantidadBanios: data["cantidadBanios"],
              ambientes: data["ambientes"],
              cocheras: data["cocheras"],
              dormitorios: data["dormitorios"],
              tipoAmbiente: data["tipoAmbiente"],
              servicios: data["servicios"],
              generales: data["generales"],
              tipoAnunciante: data["tipoAnunciante"],
              ubicaciones_padres: {
                Argentina: data["ubicaciones"][0].children
              }
            };

            resolve();
          },
          err => {
            reject(err);
          }
        );
      } else {
        resolve();
      }
    });
  }

  doBusqueda() {
    this.router.navigate(["search", this.busqueda.toRouteParams()]);
  }

  addFilter(filters) {
    for (const f in filters) {
      if (!filters.hasOwnProperty(f)) {
        continue;
      }
      this.busqueda[f] = filters[f];
    }
    this.doBusqueda();
  }

  removeFilter(filter) {
    if (Array.isArray(this.busqueda[filter.key])) {
      for (const option in this.busqueda[filter.key]) {
        if (
          this.busqueda[filter.key].hasOwnProperty(option) &&
          filter.value === option
        ) {
          this.busqueda[filter.key][option] = false;
        }
      }
    } else {
      this.busqueda[filter.key] = false;
    }
    this.doBusqueda();
  }

  getAppliedFilters() {
    const filters = [];
    for (const paramName of Object.keys(this.busqueda)) {
      if (
        !this.busqueda.hasOwnProperty(paramName) ||
        !this.busqueda[paramName]
      ) {
        continue;
      }
      switch (paramName) {
        case "tiposAmbientes":
        case "servicios":
        case "generales":
        case "ubicacion": //ToDo
          for (const ub of this.searchConfig.ubicaciones_hijas) {
            if (this.busqueda.ubicacion[ub.id]) {
              filters.push({
                label: ub.name,
                key: paramName,
                value: ub.id
              });
            }
          }
          break;
        case "ubicacion_padre":
          for (const ub of this.searchConfig.ubicaciones_padres.Argentina) {
            if (ub.id === this.busqueda[paramName]) {
              filters.push({
                label: ub.name,
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
        case "precio": //ToDo
          for (const ub of this.searchConfig.ubicaciones_padres.Argentina) {
            if (ub.value === this.busqueda[paramName]) {
              filters.push({
                label: ub.name,
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
        case "expensas": //ToDo
          for (const ub of this.searchConfig.ubicaciones_padres.Argentina) {
            if (ub.value === this.busqueda[paramName]) {
              filters.push({
                label: ub.name,
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
        case "superficie":
          for (const ub of this.searchConfig.ubicaciones_padres.Argentina) {
            if (ub.value === this.busqueda[paramName]) {
              filters.push({
                label: ub.name,
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
        case "tipoOperacion":
        case "tipoPropiedad":
        case "tipoAnunciante":
          for (const option of this.searchConfig[paramName]) {
            if (option.value === this.busqueda[paramName]) {
              filters.push({
                label: option.name,
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
        case "ambientes":
        case "dormitorios":
        case "cocheras":
          for (const option of this.searchConfig[paramName]) {
            if (option.value === this.busqueda[paramName]) {
              const capitalizedName =
                paramName.charAt(0).toUpperCase() + paramName.slice(1);
              filters.push({
                label: capitalizedName + ": " + this.busqueda[paramName],
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
        case "banios":
          for (const option of this.searchConfig[paramName]) {
            if (option.value === this.busqueda[paramName]) {
              filters.push({
                label: "Baños: " + this.busqueda[paramName],
                key: paramName,
                value: this.busqueda[paramName]
              });
            }
          }
          break;
      }
    }
    this.appliedFilters = filters;
  }
}
