import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Character } from 'src/app/models/character';
import { Comic } from 'src/app/models/comic';
import { RestService } from 'src/app/services/rest.service';

export interface AlertModel {
  id: string;
  name: string;
}

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent extends SimpleModalComponent<AlertModel, Comic> implements AlertModel {
  comics: Array<Comic> = [];
  characters: Array<Character> = [];
  id = '';
  name = '';

  constructor( private rest: RestService,  private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.characters = this.rest.getCharactersRelated(this.id);
    this.init();
    
  }

  async init() {
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(300);
  }

  

  goToCharacter(event:Character) {
    this.close();
    this.router.navigate( ['/character', event.id]);
  }

}
