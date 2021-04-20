/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appConfigFactory, AppConfigProvider } from '@app/shared/providers';
import { AppConfigService } from '@app/shared/services';
import { SharedModule } from '../shared.module';
import { NavService } from './nav.service';

describe('Service: Nav', () => {
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
        NavService,
      ],
    });
  });

  it('API NavService 생성 ...', inject([NavService], (service: NavService) => {
    expect(service).toBeTruthy();
  }));
});
