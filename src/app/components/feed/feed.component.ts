import { Component, OnInit } from '@angular/core';
import {PropiedadesService} from '../../providers/propiedades.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {


  public tiposPropiedad: string = '';
  constructor(
    private propiedadService: PropiedadesService
  ) { }

  ngOnInit() {
    this.propiedadService.getTiposPropiedad()
      .subscribe(
        r => {
          for (let tipoPropiedad of r['data']) {
            this.tiposPropiedad += tipoPropiedad.nombre + ',';
          }
          this.tiposPropiedad = this.tiposPropiedad.substr(0, this.tiposPropiedad.length - 1);
          console.log(this.tiposPropiedad);
        }
      );
  }

}
