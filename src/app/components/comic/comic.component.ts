import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comic } from 'src/app/models/comic';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

  @Output() deleteComic: EventEmitter<Comic> = new EventEmitter();
  constructor() { }
  @Input() comic: Comic = new Comic();
  ngOnInit(): void {
  }

  delete() {
    this.deleteComic.emit(this.comic);
  }
}
