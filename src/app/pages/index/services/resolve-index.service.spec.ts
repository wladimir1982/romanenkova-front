import { TestBed, inject } from '@angular/core/testing';

import { ResolveIndexService } from './resolve-index.service';

describe('ResolveIndexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveIndexService]
    });
  });

  it('should be created', inject([ResolveIndexService], (service: ResolveIndexService) => {
    expect(service).toBeTruthy();
  }));
});
