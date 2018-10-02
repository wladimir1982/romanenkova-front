import { TestBed, inject } from '@angular/core/testing';

import { ResolveScheduleService } from './resolve-schedule.service';

describe('ResolveScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveScheduleService]
    });
  });

  it('should be created', inject([ResolveScheduleService], (service: ResolveScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
