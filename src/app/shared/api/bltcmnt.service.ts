import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ApiBltcmntRoot,
  AppConfig,
  BltcmntDelParam,
  BltcmntInsParam,
  BltcmntParam,
  BltcmntUpdParam,
  HttpRes,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';
import { HttpService } from '@app/shared/services';

/**
 * 댓글 관련 API
 *
 * @export
 * @class BltcmntService
 * @extends {HttpService}
 */
@Injectable({
  providedIn: 'root',
})
export class BltcmntService extends HttpService {
  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected httpClient: HttpClient
  ) {
    super(appConfig, httpClient);
  }

  /**
   * 댓글 리스트 조회
   *
   * @param {BltcmntParam} param
   * @return {*}  {Observable<ApiBltcmntRoot>}
   * @memberof BltcmntService
   */
  public getBltcmntDesc(param: BltcmntParam): Observable<ApiBltcmntRoot> {
    return this.reqGet('/bltcmnt/selectBltcmntPg', param).pipe(
      map(
        (res: HttpRes): ApiBltcmntRoot => {
          const bltList: ApiBltcmntRoot = res.resMap as ApiBltcmntRoot;
          return bltList || ({} as ApiBltcmntRoot);
        }
      )
    );
  }

  /**
   * 댓글 등록
   *
   * @param {BltcmntInsParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltcmntService
   */
  public insBltcmnt(param: BltcmntInsParam): Observable<HttpRes> {
    return this.reqPost('/bltcmnt/insertBltcmnt', param, true);
  }

  /**
   * 댓글 수정
   *
   * @param {BltcmntUpdParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltcmntService
   */
  public updBltcmnt(param: BltcmntUpdParam): Observable<HttpRes> {
    return this.reqPut('/bltcmnt/updateBltcmnt', param, true);
  }

  /**
   * 댓글 삭제
   *
   * @param {BltcmntDelParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltcmntService
   */
  public delBltcmnt(param: BltcmntDelParam): Observable<HttpRes> {
    return this.reqDelete('/bltcmnt/deleteBltcmnt', param, true);
  }
}
