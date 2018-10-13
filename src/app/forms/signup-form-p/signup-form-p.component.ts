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

  tipo_us:any = [];

  constructor(
    private router: Router,
    private US :    UserService,
    private modal:  RegisterModalComponent
  ) { }

  ngOnInit() {
    this.US.getTypes()
      .subscribe((r) => {
        this.tipo_us =  r ['data'];
    });
  }

  nuevo(){
    this.US.model = this.model;
    this.US.create()
      .subscribe((r) => {
        this.US.setLogin(r);
        this.modal.hide();
        this.router.navigate(['/home/1']);
    });
  }

}
