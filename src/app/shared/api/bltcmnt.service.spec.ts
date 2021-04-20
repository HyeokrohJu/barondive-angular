/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BltcmntService } from './bltcmnt.service';

describe('Service: Bltcmnt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BltcmntService],
    });
  });

  it('should ...', inject([BltcmntService], (service: BltcmntService) => {
    expect(service).toBeTruthy();
  }));
});
