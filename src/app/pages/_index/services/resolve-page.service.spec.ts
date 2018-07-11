import { TestBed, inject } from '@angular/core/testing';

import { ResolvePageService } from './resolve-page.service';

describe('ResolveMainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolvePageService]
    });
  });

  it('should be created', inject([ResolvePageService], (service: ResolvePageService) => {
    expect(service).toBeTruthy();
  }));
});
