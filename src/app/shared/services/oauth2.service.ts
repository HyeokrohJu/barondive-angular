import { Observable } from 'rxjs';

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonUtils } from '@app/shared/utils';
import {
  AppConfig,
  LoginParams,
  OAuth2Config,
  OAuth2JWT,
  OAuth2Params,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';

/**
 * oAuth2 Service
 *
 * @export
 * @class Oauth2Service
 */
@Injectable({
  providedIn: 'root',
})
export class Oauth2Service {
  /**
   * oAuth2 Config
   *
   * @private
   * @type {OAuth2Config}
   * @memberof Oauth2Service
   */
  private oauth2Config: OAuth2Config = {} as OAuth2Config;

  /**
   * oAuth2 Header
   *
   * @private
   * @type {HttpHeaders}
   * @memberof Oauth2Service
   */
  private oAuth2Header: HttpHeaders = new HttpHeaders();

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient
  ) {
    this.oauth2Config = this.appConfig.oAuth2Config;
    this.oAuth2Header = this.oAuth2Header.append(
      'content-type',
      'application/x-www-form-urlencoded'
    );

    const clientSecret: string = atob(this.oauth2Config.client_secret);
    this.oAuth2Header = this.oAuth2Header.append(
      'Authorization',
      `Basic ${btoa(`${this.oauth2Config.clientId}:${clientSecret}`)}`
    );
  }

  /**
   * oAuth2 URL 조회
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof Oauth2Service
   */
  private get oAuth2Url(): string {
    const port: string =
      this.oauth2Config.port === 80 || this.oauth2Config.port === 443
        ? ''
        : `:${this.oauth2Config.port}`;
    return `${this.oauth2Config.protocol}://${this.oauth2Config.domain}${port}${this.oauth2Config.path}`;
  }

  /**
   * oAuth2 연결
   * JWT 토큰 발행
   *
   * @param {LoginParams} params
   * @return {*}  {Observable<any>}
   * @memberof Oauth2Service
   */
  public getOAuth2Jwt(params: LoginParams): Observable<OAuth2JWT> {
    const param: OAuth2Params = {
      grant_type: this.oauth2Config.grantType,
      client_id: this.oauth2Config.clientId,
      scope: this.oauth2Config.scope,
      hrschema: this.oauth2Config.hrSchema,
      hrifschema: this.oauth2Config.hrIfSchema,
      hrtimezone: this.oauth2Config.hrTimeZone,
      ...params,
    };

    return this.httpClient.post(this.oAuth2Url, CommonUtils.objToQStr(param), {
      headers: this.oAuth2Header,
    }) as Observable<OAuth2JWT>;
  }
}
