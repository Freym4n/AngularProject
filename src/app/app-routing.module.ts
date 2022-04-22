import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'character/:id', component: CharacterPageComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
