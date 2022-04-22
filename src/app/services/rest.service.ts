import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, JsonpClientBackend } from '@angular/common/http'
import { Character } from '../models/character';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  _url = 'http://gateway.marvel.com/v1/public';
  _ts = 1;
  _apiKey = "9e85186a4c801fcc6e3a1a72310f3130"
  _hash = "cd6ddb0924fc6a9932767fec4cec7c27";
  _itemsPerPage = 5;
  favoriteComics: Array<Comic> = [];
  localKey = "favoriteComics";
  totalResults = 0;
  constructor(private http: HttpClient) { 
  }

  addFavoriteComics(comic:Comic) {
    let json = JSON.stringify(comic);
    localStorage.setItem(comic.id,json);
  }

  deleteFavoriteComics(comic:Comic) {
    localStorage.removeItem(comic.id);
  }

  isFavorite(id:string) {
    let result = localStorage.getItem(id);
    return (result!=null);
  }

  getFavoriteComics() {
    this.readData();
    return this.favoriteComics;
  }

  readData() {
    this.favoriteComics = [];
    let n = localStorage.length;
    for(let i = 0; i < n; i++) {
      let key = localStorage.key(i);
      let stringKey = key == null?"":key;
      if(stringKey == "total") continue;
      let result = localStorage.getItem(stringKey);
      let resultKey = result == null?"":result;
      let jsonResult = JSON.parse(resultKey);
      let comic = new Comic();
      comic.id = jsonResult.id;
      comic.title = jsonResult.title;
      comic.image = jsonResult.image;
      comic.description = jsonResult.description;
      comic.url = jsonResult.url;
      this.favoriteComics.push(comic);
    }
  }

  getCharacters(page:number, filter:string, orderBy:string) {
    let characterList: Array<Character> = [];
    
    
    let params = this.getBaseParams()
    .set("limit", this._itemsPerPage)
    .set("offset", ((page-1)*this._itemsPerPage))
    .set("orderBy", orderBy);
    if (filter != "") params = params.set("nameStartsWith", filter);

    this.http.get(this._url + "/characters", {params}).subscribe( resp => {

      var jsonResponse = JSON.parse(JSON.stringify(resp))
      let data = jsonResponse.data.results;
      this.totalResults = jsonResponse.data.total;
      localStorage.setItem("total", this.totalResults.toString());
      for(var item in data) {

        let character = new Character();

        character.description = data[item].description;
        if (character.description == null || character.description == "") character.description = "No description available for this character."
        character.name = data[item].name;
        character.image = data[item].thumbnail.path + "." + data[item].thumbnail.extension;
        character.id = data[item].id;

        let comics = data[item].comics.items;
        let i = 0;

        for(let id in comics) {
          let comic = new Comic();

          comic.url = comics[id].resourceURI;
          comic.title = comics[id].name;
          character.comics.push(comic);

          i++;
          if(i >= 4) break;
        }

        characterList.push(character);
      }
    });
    return characterList;
  }

  getComic(url:string) {

    let comicList: Array<Comic> = [];
    
    let params = this.getBaseParams()

    this.http.get(url, {params}).subscribe( resp => {

      var jsonResponse = JSON.parse(JSON.stringify(resp))
      let data = jsonResponse.data.results;

      for(var item in data) {
        console.log(data[item]);
        let comic = new Comic();

        comic.description = data[item].description;
        if (comic.description == null || comic.description == "") comic.description = "No description available for this comic."
        comic.title = data[item].title;
        comic.image = data[item].thumbnail.path + "." + data[item].thumbnail.extension;
        comic.id = data[item].id;
        comic.price = "1.99";
        for(var price in data[item].prices) {
          comic.price = data[item].prices[price].price;
        }
        comicList.push(comic);
      }
    });
    return comicList;
  }

  getTotal() {
    let total = localStorage.getItem("total");
    let stringTotal = total == null?"":total;
    let number = parseInt(stringTotal);
    return number;
  }

  getBaseParams() {
    let params = new HttpParams()
    .set('ts',this._ts)
    .set('apikey',this._apiKey)
    .set('hash',this._hash);
    return params;
  }

  getCharacterById(id:string) {
    let characterList: Array<Character> = [];
    
    
    let params = this.getBaseParams()

    this.http.get(this._url + "/characters/" + id, {params}).subscribe( resp => {

      var jsonResponse = JSON.parse(JSON.stringify(resp))
      let data = jsonResponse.data.results;
      this.totalResults = jsonResponse.data.total;
      localStorage.setItem("total", this.totalResults.toString());
      for(var item in data) {

        let character = new Character();
        console.log(item);
        character.description = data[item].description;
        character.name = data[item].name;
        character.image = data[item].thumbnail.path + "." + data[item].thumbnail.extension;
        character.id = data[item].id;
        var wiki = data[item].urls;
        character.details = wiki[0].url;
        character.wiki = wiki[1].url;
        console.log(character.details);
        console.log(character.wiki);
        let comics = data[item].comics.items;
        let i = 0;

        for(let id in comics) {
          let comic = new Comic();

          comic.url = comics[id].resourceURI;
          comic.title = comics[id].name;
          character.comics.push(comic);

          i++;
          if(i >= 4) break;
        }

        characterList.push(character);
      }
    });
    return characterList;
  }


  getCharacterComics(id:string) {

    let comicList: Array<Comic> = [];
    let params = this.getBaseParams()
    .set("limit",12)
    this.http.get(this._url + "/characters/" + id + "/comics", {params}).subscribe( resp => {

      var jsonResponse = JSON.parse(JSON.stringify(resp))
      let data = jsonResponse.data.results;

      for(var item in data) {
        let comic = new Comic();

        comic.description = data[item].description;
        comic.title = data[item].title;
        comic.image = data[item].thumbnail.path + "." + data[item].thumbnail.extension;
        comic.id = data[item].id;
        comicList.push(comic);
      }
    });
    return comicList;
  }

  getCharacterSeries(id:string) {

    let seriesList: Array<Comic> = [];
    
    let params = this.getBaseParams()
    .set("limit",12)
    this.http.get(this._url + "/characters/" + id + "/series", {params}).subscribe( resp => {

      var jsonResponse = JSON.parse(JSON.stringify(resp))
      let data = jsonResponse.data.results;

      for(var item in data) {

        let comic = new Comic();

        comic.description = data[item].description;
        comic.title = data[item].title;
        comic.image = data[item].thumbnail.path + "." + data[item].thumbnail.extension;
        comic.id = data[item].id;
        seriesList.push(comic);
      }
    });
    return seriesList;
  }


  
  getCharactersRelated(id:string) {
    let set: Set<string> = new Set<string>();
    set.add(id);
    let characterList: Array<Character> = [];
    let params = this.getBaseParams()
    this.http.get(this._url + "/characters/" + id + "/comics", {params}).subscribe( resp => {

      var jsonResponse = JSON.parse(JSON.stringify(resp))
      let data = jsonResponse.data.results;

      for(var item in data) {

        
        let comicId = data[item].id;

        
        this.http.get(this._url + "/comics/" + comicId + "/characters", {params}).subscribe( resp2 => {

          var jsonResponse2 = JSON.parse(JSON.stringify(resp2))
          let data2 = jsonResponse2.data.results;

          for(var item2 in data2) {
            if(set.has(data2[item2].id)) continue;
            set.add(data2[item2].id);
            let character = new Character();
            character.description = data2[item2].description;
            character.name = data2[item2].name;
            character.image = data2[item2].thumbnail.path + "." + data2[item2].thumbnail.extension;
            character.id = data2[item2].id;
            characterList.push(character);
          }
        });
      }
    });
    return characterList;
  }
}
