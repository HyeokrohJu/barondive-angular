/* tslint:disable:no-unused-variable */

import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { appConfigFactory, AppConfigProvider } from '@app/shared/providers';
import { AppConfigService } from '@app/shared/services';

import { Oauth2Service } from './oauth2.service';

describe('Service: Oauth2', () => {
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
        Oauth2Service,
      ],
    });

    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('oAuth2 Service 생성 ...', inject(
    [Oauth2Service],
    (service: Oauth2Service) => {
      expect(service).toBeTruthy();
    }
  ));

  it('oAuth2 API 호출 ...', inject(
    [Oauth2Service],
    async (service: Oauth2Service) => {
      const result = await service
        .getOAuth2Jwt({ username: 'admin', password: '1234' })
        .toPromise();

      expect(result).not.toBeNull();
    }
  ));
});
