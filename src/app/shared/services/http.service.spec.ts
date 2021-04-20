/* tslint:disable:no-unused-variable */

import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { appConfigFactory, AppConfigProvider } from '@app/shared/providers';
import { AppConfigService } from '@app/shared/services';

import { HttpService } from './http.service';

describe('Service: Http', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appConfigFactory,
          deps: [AppConfigService, HttpClientModule],
          multi: true,
        },
        AppConfigProvider,
        HttpService,
      ],
    });

    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('Http Service 생성 ...', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
