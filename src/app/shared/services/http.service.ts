import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { APP_CONFIG } from '@app/shared/providers';
import { AppConfig, ApiConfig, HttpRes } from '@app/shared/interfaces';

/**
 * HTTP 통신 관련 Service
 *
 * @export
 * @class HttpService
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * API Config
   *
   * @private
   * @type {ApiConfig}
   * @memberof HttpService
   */
  private apiConfig: ApiConfig = {} as ApiConfig;

  /**
   * 기본 HTTP Header
   *
   * @private
   * @type {HttpHeaders}
   * @memberof HttpService
   */
  private defHeader: HttpHeaders = new HttpHeaders();

  /**
   * API URL
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof HttpService
   */
  private get apiUrl(): string {
    const protocol = this.apiConfig.apiSsl ? 'https://' : 'http://';
    if (this.apiConfig.apiSsl) {
      const sslPort: string =
        this.apiConfig.apiSslPort === 443
          ? ''
          : `:${this.apiConfig.apiSslPort}`;
      return `${protocol}${this.apiConfig.apiHost}${sslPort}${this.apiConfig.apiPath}`;
    }
    const port: string =
      this.apiConfig.apiPort === 80 ? '' : `:${this.apiConfig.apiPort}`;
    return `${protocol}${this.apiConfig.apiHost}${port}${this.apiConfig.apiPath}`;
  }

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected httpClient: HttpClient
  ) {
    this.apiConfig = appConfig.apiConfig;
    this.defHeader = this.defHeader.append('apiserver', 'TRUE');
  }

  /**
   * HTTP Observable 생성
   *
   * @static
   * @param {Observable<any>} http$
   * @return {*}  {Observable<HttpRes>}
   * @memberof HttpService
   */
  private req(http$: Observable<any>): Observable<HttpRes> {
    return http$.pipe(shareReplay(1));
  }

  /**
   * HTTP GET 통신
   *
   * @protected
   * @param {string} url
   * @param {*} data
   * @param {boolean} [isToken]
   * @param {{ headers: { [key: string]: string } }} [optional]
   * @return {*}  {Observable<HttpRes>}
   * @memberof HttpService
   */
  protected reqGet(
    url: string,
    data: any,
    isToken?: boolean,
    optional?: { headers: { [key: string]: string } }
  ): Observable<HttpRes> {
    let params: HttpParams = new HttpParams();
    if (data) {
      Object.keys(data).forEach((key: string) => {
        params = params.set(key, data[key]);
      });
    }

    if (isToken) {
      this.defHeader = this.defHeader.append('isToken', 'TRUE');
    }

    const endPoint = `${this.apiUrl}${url}`;
    if (optional) {
      return this.req(
        this.httpClient.get(endPoint, {
          params,
          headers: { ...optional.headers, ...this.defHeader },
        })
      );
    }
    return this.req(
      this.httpClient.get(endPoint, { params, headers: this.defHeader })
    );
  }

  /**
   * HTTP POST 통신
   *
   * @protected
   * @param {string} url
   * @param {*} data
   * @param {boolean} [isToken]
   * @param {{ headers: { [key: string]: string } }} [optional]
   * @return {*}  {Observable<HttpRes>}
   * @memberof HttpService
   */
  protected reqPost(
    url: string,
    data: any,
    isToken?: boolean,
    optional?: { headers: { [key: string]: string } }
  ): Observable<HttpRes> {
    if (isToken) {
      this.defHeader = this.defHeader.append('isToken', 'TRUE');
    }
    const endPoint = `${this.apiUrl}${url}`;
    if (optional) {
      return this.req(
        this.httpClient.post(endPoint, data, {
          headers: { ...optional.headers, ...this.defHeader },
        })
      );
    }
    return this.req(
      this.httpClient.post(endPoint, data, { headers: this.defHeader })
    );
  }

  /**
   * HTTP PUT 통신
   *
   * @protected
   * @param {string} url
   * @param {*} data
   * @param {boolean} [isToken]
   * @param {{ headers: { [key: string]: string } }} [optional]
   * @return {*}  {Observable<HttpRes>}
   * @memberof HttpService
   */
  protected reqPut(
    url: string,
    data: any,
    isToken?: boolean,
    optional?: { headers: { [key: string]: string } }
  ): Observable<HttpRes> {
    if (isToken) {
      this.defHeader = this.defHeader.append('isToken', 'TRUE');
    }
    const endPoint = `${this.apiUrl}${url}`;
    if (optional) {
      return this.req(
        this.httpClient.put(endPoint, data, {
          headers: { ...optional.headers, ...this.defHeader },
        })
      );
    }
    return this.req(
      this.httpClient.put(endPoint, data, { headers: this.defHeader })
    );
  }

  /**
   * HTTP Delete 통신
   *
   * @protected
   * @param {string} url
   * @param {*} data
   * @param {boolean} [isToken]
   * @param {{ headers: { [key: string]: string } }} [optional]
   * @return {*}  {Observable<HttpRes>}
   * @memberof HttpService
   */
  protected reqDelete(
    url: string,
    data: any,
    isToken?: boolean,
    optional?: { headers: { [key: string]: string } }
  ): Observable<HttpRes> {
    let params: HttpParams = new HttpParams();
    if (data) {
      Object.keys(data).forEach((key: string) => {
        params = params.set(key, data[key]);
      });
    }

    if (isToken) {
      this.defHeader = this.defHeader.append('isToken', 'TRUE');
    }

    const endPoint = `${this.apiUrl}${url}`;
    if (optional) {
      return this.req(
        this.httpClient.delete(endPoint, {
          params,
          headers: { ...optional.headers, ...this.defHeader },
        })
      );
    }
    return this.req(
      this.httpClient.delete(endPoint, { params, headers: this.defHeader })
    );
  }

  /**
   * HTTP Blob 통신
   *
   * @protected
   * @param {string} url
   * @param {*} data
   * @param {string} filename
   * @memberof HttpService
   */
  protected download(url: string, data: any, filename: string): void {
    const endPoint = `${this.apiUrl}${url}`;
    this.httpClient
      .post(endPoint, data, {
        responseType: 'blob',
      })
      .subscribe(
        (dataItem) => {
          saveAs(dataItem, filename);
        },
        (error: any) => {
          console.error(error);
          alert('다운로드에 실패하였습니다.');
        }
      );
  }
}
