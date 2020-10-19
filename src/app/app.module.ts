import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SongsComponent} from './components/songs-components/songs/songs.component';
import {ApiModule, Configuration} from './songbook';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {SongDetailsComponent} from './components/songs-components/song-details/song-details.component';
import {SongEditComponent} from './components/songs-components/song-edit/song-edit.component';
import {SongAddComponent} from './components/songs-components/song-add/song-add.component';
import {CategoriesBrowserComponent} from './components/categories-browser/categories-browser.component';
import {HttpRequestInterceptorService} from './services/http-request-interceptor.service';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {UserProfilePanelComponent} from './components/user/user-profile-panel/user-profile-panel.component';
import {UserPlaylistPanelComponent} from './components/user/user-playlist-panel/user-playlist-panel.component';
import {UserSongsPanelComponent} from './components/user/user-songs-panel/user-songs-panel.component';
import {LeftNavBarComponent} from './components/layouts/left-nav-bar/left-nav-bar.component';
import {UserFaceMenuComponent} from './components/layouts/user-face-menu/user-face-menu.component';
import {MainNavbarComponent} from './components/layouts/main-navbar/main-navbar.component';
import {FooterComponent} from './components/layouts/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { ActivateComponent } from './components/account/activate/activate.component';
import { PasswordResetComponent } from './components/account/password-reset/password-reset.component';
import { PasswordResetRequestComponent } from './components/account/password-reset-request/password-reset-request.component';
import { UserAddedSongsPanelComponent } from './components/user/user-added-songs-panel/user-added-songs-panel.component';
import { UserEditedSongsPanelComponent } from './components/user/user-edited-songs-panel/user-edited-songs-panel.component';
import { RatingStarComponent } from './components/utils/rating-star/rating-star.component';
import { PlaylistDialogComponent } from './components/utils/playlist-dialog/playlist-dialog.component';
import { ActivatedByRolesDirective } from './directives/activated-by-roles.directive';
import { CanEditSongDirective } from './directives/can-edit-song.directive';
import { WarningMessageBoxComponent } from './components/utils/warning-message-box/warning-message-box.component';
import { SuccessMessageBoxComponent } from './components/utils/success-message-box/success-message-box.component';
import { ProcessingMessageBoxComponent } from './components/utils/processing-message-box/processing-message-box.component';
import { AuthorsBrowserComponent } from './components/authors-browser/authors-browser.component';
import { NavTileComponent } from './components/utils/nav-tile/nav-tile.component';
import { TagsBrowserComponent } from './components/tags-browser/tags-browser.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { UserAvatarUpdateDialogComponent } from './components/user/user-avatar-update-dialog/user-avatar-update-dialog.component';
import { SongInstructionsDialogComponent } from './components/utils/song-instructions-dialog/song-instructions-dialog.component';

export function getAPIConfiguration() {
  return new Configuration({basePath: environment.baseUrl});
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SongsComponent,
    SongDetailsComponent,
    SongEditComponent,
    SongAddComponent,
    CategoriesBrowserComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    UserProfilePanelComponent,
    UserPlaylistPanelComponent,
    UserSongsPanelComponent,
    LeftNavBarComponent,
    UserFaceMenuComponent,
    MainNavbarComponent,
    FooterComponent,
    ActivateComponent,
    PasswordResetComponent,
    PasswordResetRequestComponent,
    UserAddedSongsPanelComponent,
    UserEditedSongsPanelComponent,
    RatingStarComponent,
    PlaylistDialogComponent,
    ActivatedByRolesDirective,
    CanEditSongDirective,
    WarningMessageBoxComponent,
    SuccessMessageBoxComponent,
    ProcessingMessageBoxComponent,
    AuthorsBrowserComponent,
    NavTileComponent,
    TagsBrowserComponent,
    AdminPanelComponent,
    UserAvatarUpdateDialogComponent,
    SongInstructionsDialogComponent
  ],
  imports: [
    ApiModule.forRoot(getAPIConfiguration),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptorService,
    multi: true,
  },
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
