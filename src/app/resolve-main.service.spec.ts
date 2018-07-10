import { TestBed, inject } from '@angular/core/testing';

import { ResolveMainService } from './resolve-main.service';

describe('ResolveMainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveMainService]
    });
  });

  it('should be created', inject([ResolveMainService], (service: ResolveMainService) => {
    expect(service).toBeTruthy();
  }));
});
