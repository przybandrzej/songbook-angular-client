import { TestBed } from '@angular/core/testing';

import { ModelProviderService } from './model-provider.service';

describe('ModelProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelProviderService = TestBed.get(ModelProviderService);
    expect(service).toBeTruthy();
  });
});
