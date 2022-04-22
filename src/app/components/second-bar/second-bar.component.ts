import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-second-bar',
  templateUrl: './second-bar.component.html',
  styleUrls: ['./second-bar.component.css']
})
export class SecondBarComponent implements OnInit {
  selectedValue:string = "";
  @Output() sortBy: EventEmitter<string> = new EventEmitter();
  constructor() { }
  
  ngOnInit(): void {
  }

  sort(event:any) {
    this.sortBy.emit(event.target.value);
  }

}
