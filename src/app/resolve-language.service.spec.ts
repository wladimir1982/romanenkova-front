import { TestBed, inject } from '@angular/core/testing';

import { ResolveLanguageService } from './resolve-language.service';

describe('ResolveLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveLanguageService]
    });
  });

  it('should be created', inject([ResolveLanguageService], (service: ResolveLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
