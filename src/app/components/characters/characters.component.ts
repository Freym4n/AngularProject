import { Component, EventEmitter, OnInit, Input, SimpleChanges, Output } from '@angular/core';
import { Character } from 'src/app/models/character';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Array<Character> = [];
  @Input() page:number = 1;
  @Input() filter:string = "";
  @Input() orderBy:string = "";
  @Output() updateFav: EventEmitter<boolean> = new EventEmitter();
  constructor(private rest: RestService) {
    
  }

  ngOnInit(): void {
    this.characters = this.rest.getCharacters(this.page,this.filter,this.orderBy);
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.characters = this.rest.getCharacters(this.page,this.filter,this.orderBy);
  }


  updateList() {
    this.updateFav.emit(true);
  }
}
