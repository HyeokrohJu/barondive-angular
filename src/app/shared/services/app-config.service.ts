import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '@app/shared/interfaces';

/**
 * APP Config Service
 * Front-End 설정 파일을 읽어오기 위한 Service
 *
 * @export
 * @class AppConfigService
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  /**
   * APP Config
   *
   * @private
   * @type {AppConfig}
   * @memberof AppConfigService
   */
  private pAppConfig: AppConfig = {} as AppConfig;

  /**
   * APP Config내용 Get
   *
   * @type {AppConfig}
   * @memberof AppConfigService
   */
  public get appConfig(): AppConfig {
    return this.pAppConfig;
  }

  /**
   * APP Config내용 Set
   *
   * @memberof AppConfigService
   */
  public set appConfig(config: AppConfig) {
    this.pAppConfig = config;
  }

  constructor(private http: HttpClient) {}

  /**
   * APP Config 파일 Load
   *
   * @return {*}  {Observable<AppConfig>}
   * @memberof AppConfigService
   */
  loadConfig(): Observable<AppConfig> {
    return this.getConfig();
  }

  /**
   * APP Config 파일 HTTP Observable 생성
   *
   * @return {*}  {Observable<AppConfig>}
   * @memberof AppConfigService
   */
  getConfig(): Observable<AppConfig> {
    const configFile = '/assets/configs/config.json';
    return this.http.get(configFile).pipe(
      map((config) => {
        this.appConfig = config as AppConfig;
        return config as AppConfig;
      })
    );
  }
}
