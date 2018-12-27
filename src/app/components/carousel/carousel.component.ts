import { Component, Input, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild('carousel') carousel: NgbCarousel;
  @Input() files: any[] = [];
  @Input() id_property: any = 0;
  public current: number = 1;
  public currentImgUrl: any = '';


  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
  }
  

  getCurrentSlide(e: NgbSlideEvent) 
  {
   

    let first = +this.carousel.slides.first.id.match(/[0-9]+/)[0];
    let last = +this.carousel.slides.last.id.match(/[0-9]+/)[0];
    let current = +e.current.match(/[0-9]+/)[0];
    let i = 1;
    for (let range = first; range <= last; range++) {
      if (range === current) {
        this.current = i;
        break;
      }
      i++;
    }

   
    //this = document.getElementById('imageid');
    //someimage.src = white2transparent(someimage);
   // var imageObj = new Image();
   // imageObj.onload = function() {
   //   this.drawImage(this,"canvas-1");
   // };
   // imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
  }

  getImageFixed(file, i)
  {
    var imageUrl = file.nombre != 'googlemapimage' ? file.vista_previa : file.url;   
    return imageUrl;
  }
  
  white2transparent(img)
  {
      var c = <HTMLCanvasElement>document.createElement('canvas');
  
      var w = img.width, h = img.height;
  
      c.width = w;
      c.height = h;
  
      var ctx = c.getContext('2d');
  
      ctx.drawImage(img, 0, 0, w, h);
      var imageData = ctx.getImageData(0,0, w, h);
      var pixel = imageData.data;
  
      var r=0, g=1, b=2,a=3;
      for (var p = 0; p<pixel.length; p+=4)
      {
        if (
            pixel[p+r] == 255 &&
            pixel[p+g] == 255 &&
            pixel[p+b] == 255) // if white then change alpha to 0
        {pixel[p+a] = 0;}
      }
  
      ctx.putImageData(imageData,0,0);
  
      return c.toDataURL('image/png');
  }
}
