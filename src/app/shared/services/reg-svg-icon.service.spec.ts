/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegSvgIconService } from './reg-svg-icon.service';

describe('Service: RegSvgIcon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegSvgIconService],
    });
  });

  it('should ...', inject([RegSvgIconService], (service: RegSvgIconService) => {
    expect(service).toBeTruthy();
  }));
});
