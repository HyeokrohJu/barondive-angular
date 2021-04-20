/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appConfigFactory, AppConfigProvider } from '../providers';
import { AppConfigService } from '../services';
import { SharedModule } from '../shared.module';
import { BltService } from './blt.service';

describe('Service: Blt', () => {
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
        BltService,
      ],
    });
  });

  it('API BltService 생성 ...', inject([BltService], (service: BltService) => {
    expect(service).toBeTruthy();
  }));
});
