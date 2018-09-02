import { TestBed, inject } from '@angular/core/testing';

import { ResolveMainPageService } from './resolve-main-page.service';

describe('ResolveMainPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveMainPageService]
    });
  });

  it('should be created', inject([ResolveMainPageService], (service: ResolveMainPageService) => {
    expect(service).toBeTruthy();
  }));
});
