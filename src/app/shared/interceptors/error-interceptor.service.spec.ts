/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appConfigFactory, AppConfigProvider } from '../providers';
import { AppConfigService } from '../services';
import { SharedModule } from '../shared.module';
import { ErrorInterceptorService } from './error-interceptor.service';

describe('Service: ErrorInterceptor', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, SharedModule],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appConfigFactory,
          deps: [AppConfigService, HttpClientModule],
          multi: true,
        },
        AppConfigProvider,
        ErrorInterceptorService,
      ],
    });
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('Http Call Error Interceptor 생성 ...', inject(
    [ErrorInterceptorService],
    (service: ErrorInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
