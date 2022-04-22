import { Component, Input, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }
  @Output() updatePage: EventEmitter<number> = new EventEmitter();
  @Input() total:number = 0;
  pages:number = 0;
  selected_page:number = 1;
  list: Array<number> =  [];
  ngOnInit(): void {
    this.updatePagination();

  }


  ngOnChanges(changes: SimpleChanges) {
    this.updatePagination();
  }

  updatePagination() {
    this.pages =  Math.floor((this.total + 9) / 10);
    console.log(this.pages);
    this.list = Array(Math.min(this.pages,10)).fill(1).map((x,i)=>i + 1);
    this.init();
  }

  changeSelected(page:number) {
    if(this.selected_page >= this.list[0] && this.selected_page <= this.list[this.list.length-1]) {
      let before = document.getElementById(this.selected_page.toString())!;
      before.className = "";
    }
    if(this.list.length > 0 ) {
      let current = document.getElementById(page.toString())!;
      current.className = "active";
      if(this.selected_page ==  page) return;
      this.selected_page = page;
      this.updatePage.emit(this.selected_page);
  
    }
  }

  async init() {
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(200);
    this.changeSelected(1);

  }

  goToRight() {
    let n =  this.list.length;
    if(n == 0) return;
    let last_number  = this.list[n-1];
    if(this.selected_page < this.pages) {
      this.changeSelected(this.selected_page + 1);
    }
    if(last_number == this.pages) return;
    last_number++;
    this.list.shift();
    this.list.push(last_number);

  }

  goToLeft() {
    let n =  this.list.length;
    if(n == 0) return;
    let first_number = this.list[0];
    if(this.selected_page > 1) {
      this.changeSelected(this.selected_page - 1);
    }
    if (first_number == 1) return;
    this.list.pop();
    first_number--;
    this.list.unshift(first_number);
  }
}
