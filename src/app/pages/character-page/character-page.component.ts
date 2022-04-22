import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Character } from 'src/app/models/character';
import { Comic } from 'src/app/models/comic';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rest: RestService) { }

  id:string = '';
  character: Character = new Character();
  hrefDescription: string = "#";
  hrefHome: string = "#";
  hrefSeries: string = "#";
  hrefComics: string = "#";
  hrefMore: string = "#";
  comics: Array<Comic> = [];
  series: Array<Comic> = [];

  ngOnInit(): void {
    let temp = this.route.snapshot.paramMap.get('id');
    this.id = temp==null?"":temp;
    this.getComics();
    this.init();
  }

  async init() {
    let list = this.rest.getCharacterById(this.id);
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(300);
    this.character = list[0];
    this.hrefDescription = 'character/' + this.character.id + "#description";
    this.hrefComics = 'character/' + this.character.id + "#comics";
    this.hrefSeries = 'character/' + this.character.id + "#series";
    this.hrefHome = 'character/' + this.character.id + "#home";
    this.hrefMore = 'character/' + this.character.id + "#more";
    if(this.character.description.length == 0) this.character.description = "This Character has no description."
    console.log(this.character.name);
  }

  getComics() {
    this.comics = this.rest.getCharacterComics(this.id);
    this.series = this.rest.getCharacterSeries(this.id);
  }

}
