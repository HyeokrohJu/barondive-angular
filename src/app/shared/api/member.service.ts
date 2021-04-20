import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APP_CONFIG } from '@app/shared/providers';
import { HttpService } from '@app/shared/services';
import {
  ApiMemberRoot,
  AppConfig,
  FindIdParam,
  FindPwdParam,
  HttpRes,
  IdFindRes,
  InsJoinParam,
  MemberInfo,
  MemberInfoParam,
} from '@app/shared/interfaces';

/**
 * 회원 관련 API
 *
 * @export
 * @class MemberService
 * @extends {HttpService}
 */
@Injectable({
  providedIn: 'root',
})
export class MemberService extends HttpService {
  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected httpClient: HttpClient
  ) {
    super(appConfig, httpClient);
  }

  /**
   * 아이디 찾기
   *
   * @param {FindIdParam} param
   * @return {*}  {Observable<string>}
   * @memberof MemberService
   */
  public getFindId(param: FindIdParam): Observable<IdFindRes[]> {
    return this.reqGet('/member/getFindId', param).pipe(
      map((res: HttpRes): IdFindRes[] => {
        const findObj: IdFindRes[] | undefined = (res.resMap as ApiMemberRoot)
          ?.getFindId;
        return findObj || ([] as IdFindRes[]);
      })
    );
  }

  /**
   * 비밀번호 찾기
   *
   * @param {FindPwdParam} param
   * @return {*}  {Observable<boolean>}
   * @memberof MemberService
   */
  public getFindPwd(param: FindPwdParam): Observable<boolean> {
    return this.reqGet('/member/getFindPwd', param).pipe(
      map((res: HttpRes): boolean => {
        const findBool: boolean | undefined = (res.resMap as ApiMemberRoot)
          ?.isChangePwd;
        return !!findBool;
      })
    );
  }

  /**
   * 아이디 중복 체크
   *
   * @param {IdFindRes} param
   * @return {*}  {Observable<boolean>}
   * @memberof MemberService
   */
  public isDiffMember(param: IdFindRes): Observable<boolean> {
    return this.reqGet('/member/getMember', param).pipe(
      map((res: HttpRes): boolean => {
        const userInfo: MemberInfo | undefined = (res.resMap as ApiMemberRoot)
          ?.getMember;
        return !userInfo?.loginid;
      })
    );
  }

  /**
   * 회원가입
   *
   * @param {InsJoinParam} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof MemberService
   */
  public insertMember(param: InsJoinParam): Observable<HttpRes> {
    return this.reqPost('/member/insertMember', param);
  }

  /**
   * 회원정보 조회
   *
   * @param {MemberInfoParam} param
   * @return {*}  {Observable<MemberInfo>}
   * @memberof MemberService
   */
  public getMemberInfo(param: MemberInfoParam): Observable<MemberInfo> {
    return this.reqGet('/member/getMember', param).pipe(
      map(
        (res: HttpRes): MemberInfo => {
          const userInfo: MemberInfo | undefined = (res.resMap as ApiMemberRoot)
            ?.getMember;
          return userInfo || ({} as MemberInfo);
        }
      )
    );
  }

  /**
   * 회원정보 수정
   *
   * @param {MemberInfo} param
   * @return {*}  {Observable<HttpRes>}
   * @memberof MemberService
   */
  public updateMember(param: MemberInfo): Observable<HttpRes> {
    return this.reqPut('/member/updateMember', param, true);
  }
}
