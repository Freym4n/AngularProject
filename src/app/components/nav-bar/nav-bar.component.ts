import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  @Output() filter: EventEmitter<string> = new EventEmitter();
  text:string  = "";
  ngOnInit(): void {
  }

  blurEvent(event: any){
    this.text = event.target.value; 
    this.filter.emit(this.text);
  }

  filterName() {
    this.filter.emit(this.text);
  }

}
