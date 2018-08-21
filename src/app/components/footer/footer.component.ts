import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  propiedades_alquiler:any=[
    {'tit':'Departamentos en Alquiler'},
    {'tit':'Locales en Alquiler'},
    {'tit':'Casas en Alquiler'},
    {'tit':'Oficinas en Alquiler'},
    {'tit':'Galpones en Alquiler'},
  ];

  propiedades_venta:any=[
    {'tit':'Departamentos en Venta'},
    {'tit':'Locales en Venta'},
    {'tit':'Casas en Venta'},
    {'tit':'Oficinas en Venta'},
    {'tit':'Galpones en Venta'},
  ];

  disable_footer = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if(e instanceof RouterEvent){
        if (e.url == '/select-plan'){
          this.disable_footer = true;
        } else {
          this.disable_footer = false;
        }
      }
    });
  }

}
