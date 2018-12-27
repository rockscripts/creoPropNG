import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public classN:any = "displayFormBar";
  constructor() { }
  
  ngOnInit() 
  {
    this.classN="displayFormBar";
    $(".filters-box").css("display","none");
    $(".prop-container").css("display","none");
    $(document).ready(function()
        {
          $(".filters-box").delay(1300).fadeIn(3000);
          $(".prop-container").delay(1300).fadeIn(3000);
        })
  }
}