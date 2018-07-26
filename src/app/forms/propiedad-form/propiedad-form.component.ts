import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Propiedad }          from '../../models/propiedad';
import { ZonasService }       from '../../providers/zonas.service';
import { PropiedadesService } from '../../providers/propiedades.service';



@Component({
  selector: 'app-propiedad-form',
  templateUrl: './propiedad-form.component.html',
  styleUrls: ['./propiedad-form.component.css']
})
export class PropiedadFormComponent implements OnInit {

  model     = new Propiedad();
  submitted = false;

  ciudades:any;
  provincias:any;
  barrios:any;
  equipamiento:any;

  tipo_prop:any = [
    {"id":"0","nombre":"Casa"},
    {"id":"1","nombre":"Departamento"}
  ];
  tipo_op:any = [
    {"id":"0","nombre":"Venta"},
    {"id":"1","nombre":"Alquiler"},
    {"id":"2","nombre":"Alquiler temporal"}
  ];
  disposicion:any = [
    {"id":"0","nombre":"Frente"},
    {"id":"1","nombre":"Contrafrente"},
    {"id":"2","nombre":"Interno"},
    {"id":"3","nombre":"Lateral"}
  ];
  moneda:any = [
    {"id":"1","nombre":"U$S Dólares"},
    {"id":"0","nombre":"AR$ Pesos"}
  ]

  constructor(
    private zonas:ZonasService,
    private router:Router,
    private prop:PropiedadesService
  ) {}

  updateLocalidad(){
    this.zonas.provincia     = this.model.provincia;
    this.zonas.termUbicacion = '';
    this
      .zonas.getLocalidades()
      .subscribe((r) => {
        this.ciudades =  r ['data'];
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.imgs.push({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }


  ngOnInit() {
    this.zonas.getProvincias().subscribe((r) => {  this.provincias = r['data'];  });
    this.zonas.getBarrios(1).subscribe((r) => {    this.barrios = r['data']; });
    this.prop.getEquipamiento().subscribe((r) => { this.equipamiento = r['data']; });
  }

  onSubmit() { this.submitted = true; }

  new(){
    this
      .prop
      .create(this.model)
      .subscribe((r) => {
        this.router.navigate(['/new-prop-ok',{'m':this.model.titulo,'i':r['data']['id']}]);
    });
  }

}
