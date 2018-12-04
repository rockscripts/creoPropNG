import { Component, Input, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild('carousel') carousel: NgbCarousel;
  @Input() files: any[] = [];
  public current: number = 1;


  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
  }

  getCurrentSlide(e: NgbSlideEvent) {
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
  }

}
