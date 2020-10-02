import { TestBed } from '@angular/core/testing';

import { UserSongsDataResolveService } from './user-songs-data-resolve.service';

describe('UserSongsDataResolveService', () => {
  let service: UserSongsDataResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSongsDataResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
