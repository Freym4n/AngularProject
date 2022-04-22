import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/models/comic';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Challenge';
  filter: string = "";
  orderBy: string = "";
  page1:number = 1;
  page2:number = 2;
  comicList: Array<Comic> = [];
  total:number = 1;
  constructor(private rest: RestService) {
  }

  changeFilter(event:string) {
    this.filter = event;
    this.init();
  }

  
  async init() {
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(700);
    this.total = this.rest.getTotal();
  }

  ngOnInit(): void {
    this.comicList = this.rest.getFavoriteComics();
    this.init();
  }

  changeSort(event:string) {
    this.orderBy = event;
  }

  updateFav() {
    this.comicList = this.rest.getFavoriteComics();
  }

  deleteComic(event:Comic) {
    this.rest.deleteFavoriteComics(event);
    this.updateFav();
  }
  updatePage(event:number) {
    console.log(event);
    this.page1 = event*2 - 1;
    this.page2 = event*2;
  }
}
