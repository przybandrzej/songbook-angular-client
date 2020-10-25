import { TestBed } from '@angular/core/testing';

import { SongDetailsService } from './song-details.service';

describe('SongDetailsService', () => {
  let service: SongDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
