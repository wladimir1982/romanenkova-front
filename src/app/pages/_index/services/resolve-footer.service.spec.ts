import { TestBed, inject } from '@angular/core/testing';

import { ResolveFooterService } from './resolve-footer.service';

describe('ResolveFooterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveFooterService]
    });
  });

  it('should be created', inject([ResolveFooterService], (service: ResolveFooterService) => {
    expect(service).toBeTruthy();
  }));
});
