import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';

import { UserService } from '../../providers/user.service';
import { User }        from '../../models/user';

@Component({
  selector: 'app-signup-form-p',
  templateUrl: './signup-form-p.component.html',
  styleUrls: ['./signup-form-p.component.css']
})

export class SignupFormPComponent implements OnInit {
  @ViewChild('regCloseBtn') regCloseBtn:ElementRef;

  model = new User();

  tipo_us:any = [
    {"id":"0","nombre":"Usuario particular"},
    {"id":"1","nombre":"Inmobiliaria"}
  ];

  constructor(
    private router: Router,
    private US :    UserService
  ) { }

  ngOnInit() {
  }

  nuevo(){
    this.US.model = this.model;
    this.US.create()
      .subscribe((r) => {
        this.US.setLogin(r);
        this.router.navigate(['/home/1']);
    });
  }

}
