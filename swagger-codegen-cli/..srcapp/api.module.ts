import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthorRestControllerService } from './api/authorRestController.service';
import { CategoryRestControllerService } from './api/categoryRestController.service';
import { PlaylistRestControllerService } from './api/playlistRestController.service';
import { SongCoauthorRestControllerService } from './api/songCoauthorRestController.service';
import { SongRestControllerService } from './api/songRestController.service';
import { TagRestControllerService } from './api/tagRestController.service';
import { UserRestControllerService } from './api/userRestController.service';
import { UserRoleRestControllerService } from './api/userRoleRestController.service';
import { UserSongRatingRestControllerService } from './api/userSongRatingRestController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthorRestControllerService,
    CategoryRestControllerService,
    PlaylistRestControllerService,
    SongCoauthorRestControllerService,
    SongRestControllerService,
    TagRestControllerService,
    UserRestControllerService,
    UserRoleRestControllerService,
    UserSongRatingRestControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
