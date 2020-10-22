import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdminResourceService } from './api/adminResource.service';
import { AuthenticationResourceService } from './api/authenticationResource.service';
import { AuthorResourceService } from './api/authorResource.service';
import { AwaitingSongResourceService } from './api/awaitingSongResource.service';
import { CategoryResourceService } from './api/categoryResource.service';
import { GuitarCordResourceService } from './api/guitarCordResource.service';
import { LineResourceService } from './api/lineResource.service';
import { PlaylistResourceService } from './api/playlistResource.service';
import { SongCoauthorResourceService } from './api/songCoauthorResource.service';
import { SongResourceService } from './api/songResource.service';
import { TagResourceService } from './api/tagResource.service';
import { UserResourceService } from './api/userResource.service';
import { UserRoleResourceService } from './api/userRoleResource.service';
import { UserSongRatingResourceService } from './api/userSongRatingResource.service';
import { VerseResourceService } from './api/verseResource.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdminResourceService,
    AuthenticationResourceService,
    AuthorResourceService,
    AwaitingSongResourceService,
    CategoryResourceService,
    GuitarCordResourceService,
    LineResourceService,
    PlaylistResourceService,
    SongCoauthorResourceService,
    SongResourceService,
    TagResourceService,
    UserResourceService,
    UserRoleResourceService,
    UserSongRatingResourceService,
    VerseResourceService ]
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
