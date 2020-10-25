import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SongsComponent} from './components/songs-components/songs/songs.component';
import {SongDetailsComponent} from './components/songs-components/song-details/song-details.component';
import {SongEditComponent} from './components/songs-components/song-edit/song-edit.component';
import {SongAddComponent} from './components/songs-components/song-add/song-add.component';
import {CategoriesBrowserComponent} from './components/categories-browser/categories-browser.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SongResolveService} from './services/resolve/song-resolve.service';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {UserResolveService} from './services/resolve/user-resolve.service';
import {Role} from './model/user-role';
import {NotLoggedInGuard} from './guards/not-logged-in.guard';
import {ActivateComponent} from './components/account/activate/activate.component';
import {PasswordResetComponent} from './components/account/password-reset/password-reset.component';
import {PasswordResetRequestComponent} from './components/account/password-reset-request/password-reset-request.component';
import {AuthorsBrowserComponent} from './components/authors-browser/authors-browser.component';
import {TagsBrowserComponent} from './components/tags-browser/tags-browser.component';
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';


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
    resolve: {data: SongResolveService},
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
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Admin, Role.Moderator, Role.Superuser]}
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: {data: UserResolveService},
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'activate',
    component: ActivateComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'password-reset-request',
    component: PasswordResetRequestComponent
  },
  {
    path: 'authors',
    component: AuthorsBrowserComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Admin, Role.Moderator, Role.Superuser]}
  },
  {
    path: 'tags',
    component: TagsBrowserComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Admin, Role.Moderator, Role.Superuser]}
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthenticationGuard],
    data: {roles: [Role.Admin, Role.Superuser]}
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
