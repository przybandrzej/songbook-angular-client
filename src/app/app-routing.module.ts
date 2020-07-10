import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SongsComponent} from './components/songs/songs.component';
import {SongDetailsComponent} from './components/song-details/song-details.component';
import {SongEditComponent} from './components/song-edit/song-edit.component';
import {CategoryEditorComponent} from './components/category-editor/category-editor.component';


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
    path: 'song/:id/edit',
    component: SongEditComponent
  },
  {
    path: 'add-category',
    component: CategoryEditorComponent
  },
  {
    path: 'edit-category/:id',
    component: CategoryEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
