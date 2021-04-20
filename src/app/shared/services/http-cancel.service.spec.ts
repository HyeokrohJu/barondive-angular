/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpCancelService } from './http-cancel.service';

describe('Service: HttpCancel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCancelService],
    });
  });

  it('HttpCancelService 생성 ...', inject(
    [HttpCancelService],
    (service: HttpCancelService) => {
      expect(service).toBeTruthy();
    }
  ));
});
