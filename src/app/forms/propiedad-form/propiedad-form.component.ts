import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef,
  Input
} from "@angular/core";
import { Router } from "@angular/router";
import {} from "@types/googlemaps";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms"; //[Modificar] despues se usará este componente para todos los formularios?
import { NgSelectModule } from "@ng-select/ng-select";

import { Propiedad } from "../../models/propiedad";
import { ZonasService } from "../../providers/zonas.service";
import { PropiedadesService } from "../../providers/propiedades.service";
import { UserService } from "../../providers/user.service";
import { AlertService } from "../../components/alert/alert.service";

@Component({
  selector: "app-propiedad-form",
  templateUrl: "./propiedad-form.component.html",
  styleUrls: ["./propiedad-form.component.css"]
})
export class PropiedadFormComponent implements OnInit {
  @Input()
  model: Propiedad = new Propiedad();

  submitted = false;
  dataTarget = "";

  mapZoom = 4;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  searchControl: FormControl;

  equipamiento: any;
  servicios: any;
  ambientes: any;
  carac_gral: any;

  selectedZonasByLevel: any = [null, null, null, null, null];
  zonasForSelect: any = [null, null, null, null, null];
  zonas: any;
  denomina: any = ["", "Provincia", "", "", ""];

  pais_id: number = -1;

  constructor(
    private zonasService: ZonasService,
    private router: Router,
    private prop: PropiedadesService,
    private user: UserService,
    private alert: AlertService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  onFileChange(event) {
    //[modificar] //se podrá generalizar?
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.imgs.push({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(",")[1]
        });
      };
    }
  }

  ngOnInit() {
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
    if (this.user.permiso("new-prop")) {
      if (!this.model.formValid()) {
        this.alert.show(this.model.errors);
        return false;
      }

      this.prop.create().subscribe(r => {
        this.prop.clearModel(); //[modificar] //esto se tendria que hacer automáticamente cada vez que se crea una nueva propiedad
        if (this.model.id == -1) {
          this.router.navigate(["/new-prop-ok"]);
        }
      });
    }
  }
}
