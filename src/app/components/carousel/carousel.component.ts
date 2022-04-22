import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }
  @Input() comics: Array<Comic> = [];

  ngOnInit(): void {
    this.init();
  }

  async init() {
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(300);
    console.log(this.comics);
  }

}
