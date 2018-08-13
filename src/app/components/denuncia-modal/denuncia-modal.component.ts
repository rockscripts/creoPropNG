import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-denuncia-modal',
  templateUrl: './denuncia-modal.component.html',
  styleUrls: ['./denuncia-modal.component.css']
})
export class DenunciaModalComponent implements OnInit {

  showM:boolean = false;
  cssProp:string = '';
  
  constructor() { }

  ngOnInit() {
  }

}
