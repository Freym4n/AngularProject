import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { Character } from 'src/app/models/character';
import { Comic } from 'src/app/models/comic';
import { RestService } from 'src/app/services/rest.service';
import { ComicModalComponent } from '../modal/comic/comic.component';
import { RelatedComponent } from '../modal/related/related.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @Output() updateList: EventEmitter<boolean> = new EventEmitter();
  @Input() character: Character = new Character();
  constructor(private SimpleModalService: SimpleModalService, private rest: RestService, private router: Router) { }
  comicBefore: Array<Comic> = [];

  ngOnInit(): void {
  }


  comicModal(url:string): void {
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
      this.updateList.emit(true);
    });
  }

  goToDetails() {
    this.router.navigate( ['/character', this.character.id]);
  }

  goToRelated(): void {
    this.SimpleModalService.addModal(RelatedComponent, {
      id: this.character.id,
      name: this.character.name
    }, {
      draggable: false
    });
  }
}
