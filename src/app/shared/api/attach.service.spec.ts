/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttachService } from './attach.service';

describe('Service: Attach', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachService],
    });
  });

  it('should ...', inject([AttachService], (service: AttachService) => {
    expect(service).toBeTruthy();
  }));
});
