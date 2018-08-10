import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Subject }           from "rxjs/Subject";

import { UserService } from '../../providers/user.service';
import { User }        from '../../models/user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})

export class LoginModalComponent implements OnInit {
  @ViewChild('lgCloseBtn') lgCloseBtn:ElementRef;

  model = new User();

  private _subject: Subject<any>;

  constructor(
    private router: Router,
    private US :    UserService
  ) { }

  ngOnInit() {
  }

  login(){
    this.US.model = this.model;
    this.US.logIn()
      .subscribe((r) => {
        this.US.setLogin(r);
        this.lgCloseBtn.nativeElement.click();
        this.US.onLogin.next();
        this.router.navigate(['/home/1']);
    });
  }
}
