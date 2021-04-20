/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from '@app/shared/services';
import { appConfigFactory, AppConfigProvider } from '../providers';
import { SharedModule } from '../shared.module';
import { CancelInterceptorService } from './cancel-interceptor.service';

describe('Service: CancelInterceptor', () => {
  beforeEach(() => {
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
        CancelInterceptorService,
      ],
    });
  });

  it('Http Call Cancel Interceptor 생성 ...', inject(
    [CancelInterceptorService],
    (service: CancelInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
