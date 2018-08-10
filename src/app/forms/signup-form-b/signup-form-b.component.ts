import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';

import { UserService } from '../../providers/user.service';
import { User }        from '../../models/user';

@Component({
  selector: 'app-signup-form-b',
  templateUrl: './signup-form-b.component.html',
  styleUrls: ['./signup-form-b.component.css']
})
export class SignupFormBComponent implements OnInit {

  model = new User();

  constructor(
    private US:     UserService,
    private modal:  RegisterModalComponent,
    private router: Router
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
