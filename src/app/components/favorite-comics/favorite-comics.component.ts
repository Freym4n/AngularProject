import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Comic } from 'src/app/models/comic';
import { RestService } from 'src/app/services/rest.service';
import { ComicModalComponent } from '../modal/comic/comic.component';

@Component({
  selector: 'app-favorite-comics',
  templateUrl: './favorite-comics.component.html',
  styleUrls: ['./favorite-comics.component.css']
})
export class FavoriteComicsComponent implements OnInit {

  constructor(private SimpleModalService: SimpleModalService,  private rest: RestService) { }

  @Input() comics:Array<Comic> = [];

  @Output() deleteComicFromFav: EventEmitter<Comic> = new EventEmitter();

  @Output() updateList2: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.comics);
  }



    
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(this.comics);
  }

  deleteComic(event:Comic) {
    this.deleteComicFromFav.emit(event);
  }

  comicModal(comic:Comic): void {
    let url = comic.url;
    if(url ==  '') return;
    let id = url.split('/')[6];
    let favorite = this.rest.isFavorite(id);
    this.SimpleModalService.addModal(ComicModalComponent, {
      comic_url: url
    }, {
      draggable: false

    }).subscribe((comic) => {
      if (favorite  == comic.favorite)
        return;
      favorite = comic.favorite;
      if (favorite) {
        alert(comic.title + " has been added to favorite list.");
      }
      else {
        alert(comic.title + " has been deleted to favorite list.");
      }
      this.updateList2.emit(true);
    });
  }
}
