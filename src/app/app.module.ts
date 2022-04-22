import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { CharactersComponent } from './components/characters/characters.component';
import { ComicComponent } from './components/comic/comic.component';
import { FavoriteComicsComponent } from './components/favorite-comics/favorite-comics.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SecondBarComponent } from './components/second-bar/second-bar.component';
import { ComicModalComponent } from './components/modal/comic/comic.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RelatedComponent } from './components/modal/related/related.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharactersComponent,
    ComicComponent,
    FavoriteComicsComponent,
    NavBarComponent,
    SecondBarComponent,
    ComicModalComponent,
    PaginationComponent,
    CharacterPageComponent,
    HomeComponent,
    CarouselComponent,
    RelatedComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SimpleModalModule.forRoot({container:document.body})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
