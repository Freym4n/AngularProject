import { Component, Output, EventEmitter} from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Comic } from 'src/app/models/comic';
import { RestService } from 'src/app/services/rest.service';

export interface AlertModel {
  comic_url: string;
}
@Component({
  selector: 'app-modal-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicModalComponent extends SimpleModalComponent<AlertModel, Comic> implements AlertModel {
  comics: Array<Comic> = [];
  comic_url = '';

  constructor( private rest: RestService) {
    super();
  }

  ngOnInit(): void {
    this.comics = this.rest.getComic(this.comic_url);
    this.init();
    
  }

  async init() {
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(300);
    this.comics[0].favorite = this.rest.isFavorite(this.comics[0].id);
    console.log(this.comics[0].favorite);
  }

  
  updateFavoriteStatus() {
    
    this.comics[0].favorite = !this.comics[0].favorite;
    this.result = this.comics[0];
    if(this.comics[0].favorite) {
      this.rest.addFavoriteComics(this.comics[0]);
    } else {
      this.rest.deleteFavoriteComics(this.comics[0]);
    }
    this.result = this.comics[0];
  }

  

}