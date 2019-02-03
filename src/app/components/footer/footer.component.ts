import { Component, OnInit } from "@angular/core";

import { Router, RouterEvent } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  propiedades_alquiler: any = [
    { tit: "Departamentos en Alquiler", id:  1, tipoPropiedad: 2 },
    { tit: "Locales en Alquiler", id: 1, tipoPropiedad: 23 },
    { tit: "Casas en Alquiler", id: 1, tipoPropiedad: 1},
    { tit: "Oficinas en Alquiler", id: 1, tipoPropiedad: 26 },
    { tit: "Galpones en Alquiler", id: 1, tipoPropiedad: 20 }
  ];

  propiedades_venta: any = [
    { tit: "Departamentos en Venta", id: 0, tipoPropiedad: 2 },
    { tit: "Locales en Venta", id: 0, tipoPropiedad: 23 },
    { tit: "Casas en Venta", id: 0, tipoPropiedad: 1 },
    { tit: "Oficinas en Venta", id: 0, tipoPropiedad: 26},
    { tit: "Galpones en Venta", id: 0, tipoPropiedad: 20 }
  ];

  disable_footer = false;
  disable_frequent_searches = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof RouterEvent) {
        if (
          e.url == "/select-plan" ||
          e.url == "/update-plan" ||
          e.url == "/new-prop" ||
          e.url.indexOf("/mi-cuenta") === 0
        ) {
          this.disable_footer = true;
        } else {
          this.disable_footer = false;
        }
        if(e.url.indexOf("/propiedad") === 0) {
          this.disable_frequent_searches = true;
        }else{
          this.disable_frequent_searches = false;
        }
      }
    });
  }
}
