import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterModalService } from '../../components/register-modal/register-modal.service';

import { UserService } from '../../providers/user.service';
import { User } from '../../models/user';
import { Inmobiliaria } from '../../models/inmobiliaria';
import { AlertService } from '../../components/alert/alert.service';

@Component({
  selector: 'app-signup-form-p',
  templateUrl: './signup-form-p.component.html',
  styleUrls: ['./signup-form-p.component.css']
})

export class SignupFormPComponent implements OnInit {

  model = new User();

  tipo_us: any = [];
  inmobiliarias: any[] = [];

  constructor(
    private router: Router,
    private US: UserService,
    private modal: RegisterModalService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.US.getTypes()
      .subscribe((r) => {
        this.tipo_us = r['data'];
      });

    this.US.getInmobiliarias()
      .subscribe(res => {
        this.inmobiliarias = res.data.map((item: Inmobiliaria) => {
          return {
            id: item.id,
            name: item.nombre
          }
        });
      });

    this.model.tipo_user_id = 1;
  }

  nuevo() {
    let formValid = this.model.formValid();

    if (!formValid.valid) {
      this.alert.show('Hay errores en formulario: <br><br> Por favor ' + formValid.msg);
      return;
    }

    this.US.model = this.model;
    this.US.create()
      .subscribe(res => {
        this.US.setLogin(res);
        this.modal.hide();
        this.US.onLogin.next();
        this.US.clearModel();
        this.model = new User();
        this.router.navigate(['/home/1']);
      });
  }

}
