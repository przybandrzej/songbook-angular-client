import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SongsComponent} from './components/songs/songs.component';
import {SongDetailsComponent} from './components/song-details/song-details.component';
import {SongEditComponent} from './components/song-edit/song-edit.component';
import {SongAddComponent} from './components/song-add/song-add.component';
import {CategoriesBrowserComponent} from './components/categories-browser/categories-browser.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'songs',
    component: SongsComponent
  },
  {
    path: 'song/:id',
    component: SongDetailsComponent
  },
  {
    path: 'edit-song/:id',
    component: SongEditComponent
  },
  {
    path: 'add-song',
    component: SongAddComponent
  },
  {
    path: 'categories',
    component: CategoriesBrowserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
