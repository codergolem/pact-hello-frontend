import { TestBed, inject } from '@angular/core/testing';

import { HelloServiceService } from './hello-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HelloServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelloServiceService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([HelloServiceService], (service: HelloServiceService) => {
    expect(service).toBeTruthy();
  }));
});
