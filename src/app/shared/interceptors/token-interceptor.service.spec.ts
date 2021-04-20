/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appConfigFactory, AppConfigProvider } from '../providers';
import { AppConfigService } from '../services';
import { SharedModule } from '../shared.module';
import { TokenInterceptorService } from './token-interceptor.service';

describe('Service: TokenInterceptor', () => {
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
        TokenInterceptorService,
      ],
    });
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('HTTP Call Token Add Interceptor 생성 ...', inject(
    [TokenInterceptorService],
    (service: TokenInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
