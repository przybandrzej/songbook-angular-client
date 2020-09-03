import { TestBed } from '@angular/core/testing';

import { SongResolveService } from './song-resolve.service';

describe('SongResolveService', () => {
  let service: SongResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
