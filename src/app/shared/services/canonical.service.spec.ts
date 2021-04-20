/* tslint:disable:no-unused-variable */

import * as _ from 'lodash';

import { TestBed, inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { CanonicalService } from './canonical.service';

describe('Service: Canonical', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanonicalService],
    });
  });

  it('Canonical Service 생성', inject(
    [CanonicalService],
    (service: CanonicalService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('Canonical setCanonicalURL Method 정상동작', inject(
    [CanonicalService, DOCUMENT],
    (service: CanonicalService, dom: Document) => {
      service.setCanonicalURL();
      const canonicalLink: HTMLLinkElement | undefined = _.find(
        dom.head.getElementsByTagName('link'),
        (item: HTMLLinkElement): boolean => {
          return item.getAttribute('rel') === 'canonical';
        }
      );

      expect(canonicalLink).toBeTruthy();
    }
  ));
});
