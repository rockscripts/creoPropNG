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
  public is_modified = {};

  public listRangeParams: any = ["precio", "expensas", "superficie"];
  public precioDesde: string;
  public precioHasta: string;
  public expensasDesde: string;
  public expensasHasta: string;
  public superficieDesde: string;
  public superficieHasta: string;

  public appliedFilters: any = [];
  public countSelectedFilters: any = {};

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
          this.is_modified = {};
          this.busqueda.fromRouteParams(params);

          for (const paramName of this.listRangeParams) {
            if (this.busqueda[paramName]) {
              const splitted = this.busqueda[paramName].split("-");
              this[paramName + "Desde"] = splitted[0];
              this[paramName + "Hasta"] = splitted[1];
            } else {
              this[paramName + "Desde"] = null;
              this[paramName + "Hasta"] = null;
            }
          }

          this.searchConfig.ubicaciones_hijas = null;
          if (this.busqueda.ubicacion_padre) {
            for (const ub of this.searchConfig.ubicaciones_padres.Argentina) {
              if (ub.id === this.busqueda.ubicacion_padre && ub.children) {
                this.searchConfig.ubicaciones_hijas = ub.children;
                break;
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

  onMultiParamChange(paramName, value) {
    if (!this.busqueda[paramName] || null === this.busqueda[paramName]) {
      this.busqueda[paramName] = {};
    }
    this.busqueda[paramName][value] = !this.busqueda[paramName][value];
    this.is_modified[paramName] = true;
    this.countSelectedFilters[paramName] = Object.keys(
      this.busqueda[paramName]
    ).map(x => {
      return x;
    }).length;
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
    if (
      Array.isArray(this.busqueda[filter.key]) ||
      typeof this.busqueda[filter.key] === "object"
    ) {
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
    if (filter.key == "ubicacion_padre") {
      this.busqueda["ubicacion"] = false;
    }
    this.doBusqueda();
  }

  getAppliedFilters() {
    const filters = [];
    for (const paramName of Object.keys(this.busqueda)) {
      if (
        !this.busqueda.hasOwnProperty(paramName) ||
        !this.busqueda[paramName] ||
        this.busqueda[paramName] === null
      ) {
        continue;
      }
      switch (paramName) {
        case "ubicacion":
          if (
            this.searchConfig.ubicaciones_hijas &&
            this.searchConfig.ubicaciones_hijas.length
          ) {
            for (const ub of this.searchConfig.ubicaciones_hijas) {
              if (this.busqueda.ubicacion && this.busqueda.ubicacion[ub.id]) {
                filters.push({
                  label: ub.name,
                  key: paramName,
                  value: ub.id
                });
              }
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
        case "servicios":
        case "generales":
        case "tipoAmbiente":
          if (
            this.searchConfig[paramName] &&
            this.searchConfig[paramName].length
          ) {
            for (const option of this.searchConfig[paramName]) {
              if (
                this.busqueda[paramName] &&
                this.busqueda[paramName][option.value]
              ) {
                filters.push({
                  label: option.name,
                  key: paramName,
                  value: option.value
                });
              }
            }
          }
          break;
        case "precio":
        case "expensas":
          const splittedPrice = this.busqueda[paramName].split("-");
          if (splittedPrice.length > 0) {
            const capitalizedName =
              paramName.charAt(0).toUpperCase() + paramName.slice(1);
            filters.push({
              label:
                capitalizedName +
                ": $" +
                splittedPrice[0] +
                "-$" +
                splittedPrice[1],
              key: paramName,
              value: this.busqueda[paramName]
            });
          }
          break;
        case "tipoMoneda":
          if (this.busqueda[paramName]) {
            const capitalizedValue =
              this.busqueda[paramName].charAt(0).toUpperCase() +
              this.busqueda[paramName].slice(1);
            filters.push({
              label: "Moneda: " + capitalizedValue,
              key: paramName,
              value: this.busqueda[paramName]
            });
          }
          break;
        case "superficie":
          const splittedSurface = this.busqueda[paramName].split("-");
          if (splittedSurface.length > 0) {
            filters.push({
              label:
                "Superficie: " +
                splittedSurface[0] +
                "m²-" +
                splittedSurface[1] +
                "m²",
              key: paramName,
              value: this.busqueda[paramName]
            });
          }
          break;
        case "tipoSuperficie":
          if (this.busqueda[paramName]) {
            const capitalizedValue =
              this.busqueda[paramName].charAt(0).toUpperCase() +
              this.busqueda[paramName].slice(1);
            filters.push({
              label: "Superficie: " + capitalizedValue,
              key: paramName,
              value: this.busqueda[paramName]
            });
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
        case "cantidadBanios":
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
