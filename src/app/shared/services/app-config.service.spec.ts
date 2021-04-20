/* tslint:disable:no-unused-variable */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';

describe('Service: AppConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppConfigService],
    });
  });

  it('AppConfig Service 생성', inject(
    [AppConfigService],
    (service: AppConfigService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('config.json Load ...', inject(
    [AppConfigService],
    async (service: AppConfigService) => {
      await expectAsync(service.loadConfig().toPromise()).toBeResolved();

      expect(service.appConfig).toBeTruthy();
    }
  ));
});
