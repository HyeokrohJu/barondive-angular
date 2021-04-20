/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LazyLoadLibService } from './lazy-load-lib.service';

describe('Service: LazyLoadLib', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadLibService],
    });
  });

  it('should ...', inject(
    [LazyLoadLibService],
    (service: LazyLoadLibService) => {
      expect(service).toBeTruthy();
    }
  ));
});
