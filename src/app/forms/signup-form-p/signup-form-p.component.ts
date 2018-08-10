import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';

import { UserService } from '../../providers/user.service';
import { User }        from '../../models/user';

@Component({
  selector: 'app-signup-form-p',
  templateUrl: './signup-form-p.component.html',
  styleUrls: ['./signup-form-p.component.css']
})

export class SignupFormPComponent implements OnInit {

  model = new User();

  tipo_us:any = [
    {"id":"0","nombre":"Usuario particular"},
    {"id":"1","nombre":"Inmobiliaria"}
  ];

  constructor(
    private router: Router,
    private US :    UserService,
    private modal:  RegisterModalComponent
  ) { }

  ngOnInit() {
  }

  nuevo(){
    this.US.model = this.model;
    this.US.create()
      .subscribe((r) => {
        this.US.setLogin(r);
        this.modal.cerrar();
        this.router.navigate(['/home/1']);
    });
  }

}
