import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-denuncia-prop-form',
  templateUrl: './denuncia-prop-form.component.html',
  styleUrls: ['./denuncia-prop-form.component.css']
})
export class DenunciaPropFormComponent implements OnInit {

  motivos_denuncia = [
    {"id":"0","nombre":"Es un intento de estafa"},
    {"id":"1","nombre":"Está repetido"},
    {"id":"2","nombre":"Datos incorrectos"},
    {"id":"3","nombre":"El inmueble ya está alquilado o vendido"},
    {"id":"4","nombre":"Otro motivo"},
  ];

  constructor() { }

  ngOnInit() {
  }

}
