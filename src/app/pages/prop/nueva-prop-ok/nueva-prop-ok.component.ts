import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

@Component({
  selector: 'app-nueva-prop-ok',
  templateUrl: './nueva-prop-ok.component.html',
  styleUrls: ['./nueva-prop-ok.component.css']
})
export class NuevaPropOkComponent implements OnInit {

  titulo:string;
  id:any;

  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.titulo = this.activatedRoute.snapshot.paramMap.get('m');
    this.id     = this.activatedRoute.snapshot.paramMap.get('i');
  }

}
