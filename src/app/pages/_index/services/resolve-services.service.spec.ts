import { TestBed, inject } from '@angular/core/testing';

import { ResolveServicesService } from './resolve-services.service';

describe('ResolveServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveServicesService]
    });
  });

  it('should be created', inject([ResolveServicesService], (service: ResolveServicesService) => {
    expect(service).toBeTruthy();
  }));
});
