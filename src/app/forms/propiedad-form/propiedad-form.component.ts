import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  Input
} from "@angular/core";
import { Router } from "@angular/router";
import { } from "@types/googlemaps";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms"; //[Modificar] despues se usará este componente para todos los formularios?
import { NgSelectModule } from "@ng-select/ng-select";

import { Propiedad } from "../../models/propiedad";
import { ZonasService } from "../../providers/zonas.service";
import { PropiedadesService } from "../../providers/propiedades.service";
import { UserService } from "../../providers/user.service";
import { AlertService } from "../../components/alert/alert.service";
import { ConfigService } from '../../providers/config.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './../../providers/profile.service';
import { SubscriptionService } from "../../providers/subscription.service";
import { Subscripcion } from './../../models/subscripcion';

@Component({
  selector: "app-propiedad-form",
  templateUrl: "./propiedad-form.component.html",
  styleUrls: ["./propiedad-form.component.css"]
})
export class PropiedadFormComponent implements OnInit {
  @Input()
  model: Propiedad = new Propiedad();

  ngOnChanges(model: Propiedad = new Propiedad()) {
    if (this.model.files.length > 0 && this.imgsloaded == false) {
      this.loadfiles();
      this.imgsloaded = true;
    }
  }
  submitted = false;
  dataTarget = "";

  mapZoom = 4;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  searchControl: FormControl;

  equipamiento: any;
  servicios: any;
  tiposPropiedad: any;
  ambientes: any;
  carac_gral: any;
  cargando = false;
  selectedZonasByLevel: any = [null, null, null, null, null];
  zonasForSelect: any = [null, null, null, null, null];
  zonas: any;
  denomina: any = ["", "Provincia", "", "", ""];

  pais_id: number = -1;

  urls = new Array<string>();

  imgsloaded = false;

  permitirDestaque: any = false;
  public subscription = new Subscripcion();
  profileResponse: any = null;


  constructor(
    private zonasService: ZonasService,
    private router: Router,
    private prop: PropiedadesService,
    private user: UserService,
    private alert: AlertService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private profile: ProfileService,
    private profileSubscription: SubscriptionService
  ) {

  }

  loadfiles() {
    this.model.files.forEach(file => {
      fetch(file.nombre)
        .then(res => res.blob())
        .then(blob => {
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e: any) => {
            this.model.imgs.push({
              filename: file.nombre,
              filetype: file.tipo,
              value: reader.result.split(",")[1],
              url: e.target.result,
              new: false
            });
          }
        });
    });
  }



  onFileChange(event) {
    for (let file of event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        if (this.model.imgs.length < 20) {
          this.model.imgs.push({
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(",")[1],
            url: e.target.result,
            new: true
          });
        }
        else
          alert("No se puede subir más de 20 Imagenes por propiedad");
      };
    }
  }



  ngOnInit() {
    this.profile.getProfile(this.user.getId()).subscribe((r) => {
      if (!r || !r["data"]) {
        return;
      }
      this.profileResponse = r["data"];
      try {
        this.subscription.max_avisos_disponibles = this.profileResponse.subscripcion[0].subscripcion.max_avisos_disponibles;
        this.subscription.max_destaques_disponibles = this.profileResponse.subscripcion[0].subscripcion.max_destaques_disponibles;
      }
      catch (e) {

      }
    });

    this.zonasService.getZonas().subscribe(r => {
      this.zonas = r["data"][0].children; //Children zonas of Argentina
      this.zonasForSelect[1] = this.zonas;
    });

    this.prop.getEquipamiento().subscribe(r => {
      this.equipamiento = r["data"];
    });
    this.prop.getServicios().subscribe(r => {
      this.servicios = r["data"];
    });
    this.prop.getTiposPropiedad().subscribe(r => {
      this.tiposPropiedad = r["data"];
    });
    this.prop.getAmbientes().subscribe(r => {
      this.ambientes = r["data"];
    });
    this.prop.getCaraceristicas().subscribe(r => {
      this.carac_gral = r["data"];
    });

    this.initMaps();
  }

  private initMaps() {
    this.setCurrentPosition();
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.model.latitud = place.geometry.location.lat();
          this.model.longitud = place.geometry.location.lng();
          this.mapZoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.model.latitud = position.coords.latitude;
        this.model.longitud = position.coords.longitude;
        this.mapZoom = 12;
      });
    }
  }

  changeZonaSelect(actualLevel) {
    const nextLevel = actualLevel + 1;

    this.model.zona = [this.selectedZonasByLevel[actualLevel]];

    //Clean all next fields
    for (let i = nextLevel; i <= this.zonasService.MAX_LEVELS; i++) {
      this.zonasForSelect[i] = null;
      this.selectedZonasByLevel[i] = null;
    }

    //Populate next field
    for (const zona of this.zonasForSelect[actualLevel]) {
      if (zona.id === this.selectedZonasByLevel[actualLevel] && zona.children) {
        this.zonasForSelect[nextLevel] = zona.children;
      }
    }
  }

  onSubmit() {
    this.submitted = true;
  }

  guardar() {
    this.prop.setModel(this.model);
    this.cargando = true;

    //Edición de propiedad
    if (this.model.id != -1) {
      this.prop.edit().subscribe(r => {
        this.cargando = false;
        this.prop.clearModel(); //[modificar] //esto se tendria que hacer automáticamente cada vez que se crea una nueva propiedad
        this.router.navigate(["mi-cuenta"]);
      });
    }
    else {

      if (this.user.permiso("new-prop")) {
        if (!this.model.formValid()) {
          this.cargando = false;
          this.alert.show(this.model.errors);
          return false;

        }

        if (!this.selectedZonasByLevel[1]) {
          this.cargando = false;
          this.alert.show("Por favor seleccione una provincia");
          return false;
        }

        if (!this.selectedZonasByLevel[2]) {
          this.cargando = false;
          this.alert.show("Por favor seleccione una ciudad");
          return false;
        }

        this.prop.create().subscribe(r => {
          this.cargando = false;
          if (!r['errors']) {
            this.prop.clearModel(); //[modificar] //esto se tendria que hacer automáticamente cada vez que se crea una nueva propiedad
            if (this.model.id == -1) {
              this.router.navigate(["/new-prop-ok"]);
            }
          } else {
            this.alert.showAlert.next({ t: 'a', m: r['errors'] });
          }

        });
      }
    }
  }

}
