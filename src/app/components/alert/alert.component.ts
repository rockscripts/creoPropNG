import { Component, OnInit } from '@angular/core';

import { AlertService }      from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  msg:string      = '';
  oculto:boolean  = true;
  success:boolean = false;
  danger:boolean  = false;

  constructor(
    private alert:AlertService
  ) { }

  ngOnInit() {
    this.alert.showAlert.subscribe({
      next: (v) => {
        this.setTipo(v['t']);
        this.show(v['m']);
      }
    });
  }

  setTipo(t){
    if (t=='a'){
      this.success = false;
      this.danger  = true;
    }
    if (t=='s'){
      this.success = true;
      this.danger  = false;
    }
  }

  dismiss(){  this.oculto = true; }
  show(msg) { this.msg = msg; this.oculto = false; }
}
