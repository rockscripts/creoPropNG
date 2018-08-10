import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild('regCloseBtn') regCloseBtn:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  cerrar(){
    this.regCloseBtn.nativeElement.click();
  }

}
