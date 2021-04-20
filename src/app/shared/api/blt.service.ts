import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ApiBltRoot,
  AppConfig,
  BltDesc,
  BltInsParam,
  BltListParam,
  BltParam,
  HttpRes,
} from '@app/shared/interfaces';
import { APP_CONFIG } from '@app/shared/providers';
import { HttpService } from '@app/shared/services';

/**
 * 게시물 관련 API
 *
 * @export
 * @class BltService
 * @extends {HttpService}
 */
@Injectable({
  providedIn: 'root',
})
export class BltService extends HttpService {
  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected httpClient: HttpClient
  ) {
    super(appConfig, httpClient);
  }

  /**
   * 게시물 상세 조회
   *
   * @param {BltParam} param
   * @return {*}  {Observable<BltDesc>}
   * @memberof BltService
   */
  public getBltDesc(param: BltParam): Observable<BltDesc> {
    return this.reqGet('/blt/getBlt', param).pipe(
      map(
        (res: HttpRes): BltDesc => {
          const bltDesc: BltDesc | undefined = (res.resMap as ApiBltRoot)
            ?.getBlt;
          return bltDesc || ({} as BltDesc);
        }
      )
    );
  }

  /**
   * 게시물 리스트 조회
   *
   * @param {BltListParam} param
   * @return {*}  {Observable<ApiBltRoot>}
   * @memberof BltService
   */
  public getBltList(param: BltListParam): Observable<ApiBltRoot> {
    return this.reqGet('/blt/selectBltPg', param).pipe(
      map(
        (res: HttpRes): ApiBltRoot => {
          const bltList: ApiBltRoot = res.resMap as ApiBltRoot;
          return bltList || ({} as ApiBltRoot);
        }
      )
    );
  }

  /**
   * 게시물 등록
   *
   * @param {BltInsParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltService
   */
  public insBlt(param: BltInsParam): Observable<HttpRes> {
    return this.reqPost('/blt/insertBlt', param, true);
  }

  /**
   * 게시물 수정
   *
   * @param {BltInsParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltService
   */
  public updBlt(param: BltInsParam): Observable<HttpRes> {
    return this.reqPut('/blt/updateBlt', param, true);
  }

  /**
   * 게시물 삭제
   *
   * @param {BltParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltService
   */
  public delBlt(param: BltParam): Observable<HttpRes> {
    return this.reqDelete('/blt/deleteBlt', param, true);
  }

  /**
   * 게시물 조회수 증가
   *
   * @param {BltParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof BltService
   */
  public updBltCnt(param: BltParam): Observable<boolean> {
    return this.reqPut('/blt/updateCntBlt', param, true).pipe(
      map((res: HttpRes): boolean => {
        const bltList: ApiBltRoot = res.resMap as ApiBltRoot;
        return !!bltList.updateCntBlt;
      })
    );
  }
}
