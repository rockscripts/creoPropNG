import { Component, OnInit, ViewChild, ElementRef }  from '@angular/core';
import { Router }             from '@angular/router';

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
    private router: Router
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
