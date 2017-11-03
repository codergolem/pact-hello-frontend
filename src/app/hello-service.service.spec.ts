import { TestBed, inject } from '@angular/core/testing';

import { HelloServiceService } from './hello-service.service';

describe('HelloServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelloServiceService]
    });
  });

  it('should be created', inject([HelloServiceService], (service: HelloServiceService) => {
    expect(service).toBeTruthy();
  }));
});
