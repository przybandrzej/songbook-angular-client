import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SongsComponent} from './components/songs/songs.component';
import {SongDetailsComponent} from './components/song-details/song-details.component';
import {SongEditComponent} from './components/song-edit/song-edit.component';
import {SongAddComponent} from './components/song-add/song-add.component';
import {CategoriesBrowserComponent} from './components/categories-browser/categories-browser.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {LoginComponent} from './components/utils/login/login.component';
import {RegisterComponent} from './components/utils/register/register.component';
import {SongResolveService} from './services/resolve/song-resolve.service';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserResolveService} from './services/resolve/user-resolve.service';


const routes: Routes = [
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
    component: SongDetailsComponent,
    resolve: {data: SongResolveService}
  },
  {
    path: 'edit-song/:id',
    component: SongEditComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'add-song',
    component: SongAddComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'categories',
    component: CategoriesBrowserComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: {data: UserResolveService},
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
