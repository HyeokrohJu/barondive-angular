import * as _ from 'lodash';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

import {
  AccessTokenInfo,
  OAuth2JWT,
  RefreshTokenInfo,
  StorageToken,
} from '@app/shared/interfaces';

/**
 * oAuth Utils
 *
 * @export
 * @class OauthUtils
 */
export class OauthUtils {
  /**
   * Token Expire 체크 타임(ms)
   *
   * @private
   * @static
   * @memberof OauthUtils
   */
  private static MIN_TOKEN_LIFESPAN = 1800;

  /**
   * Token 여부
   *
   * @static
   * @return {*}  {boolean}
   * @memberof OauthUtils
   */
  public static isToken(): boolean {
    return !!OauthUtils.getLocStorage('access_token');
  }

  /**
   * Token Storage 등록
   *
   * @static
   * @param {OAuth2JWT} data
   * @memberof OauthUtils
   */
  public static addToken(data: OAuth2JWT): void {
    OauthUtils.setLocStorage('access_token', data.access_token);
    OauthUtils.setLocStorage('refresh_token', data.refresh_token);
  }

  /**
   * Storage에 등록된 Token 삭제
   *
   * @static
   * @memberof OauthUtils
   */
  public static removeToken(): void {
    OauthUtils.removeLocStorage('access_token');
    OauthUtils.removeLocStorage('refresh_token');
  }

  /**
   * Storage에 등록된 Token 조회
   *
   * @static
   * @return {*}  {StorageToken}
   * @memberof OauthUtils
   */
  public static storageToken(): StorageToken {
    return {
      access_token: _.toString(OauthUtils.getLocStorage('access_token')),
      refresh_token: _.toString(OauthUtils.getLocStorage('refresh_token')),
    };
  }

  /**
   * Access Token JWT Decode 정보 조회
   *
   * @static
   * @return {*}  {AccessTokenInfo}
   * @memberof OauthUtils
   */
  public static getAccessToken(): AccessTokenInfo {
    return (OauthUtils.storageToken().access_token &&
      jwtDecode(OauthUtils.storageToken().access_token)) as AccessTokenInfo;
  }

  /**
   * Refresh Token JWT Decode 정보 조회
   *
   * @static
   * @return {*}  {RefreshTokenInfo}
   * @memberof OauthUtils
   */
  public static getRefreshToken(): RefreshTokenInfo {
    return (OauthUtils.storageToken().refresh_token &&
      jwtDecode(OauthUtils.storageToken().refresh_token)) as RefreshTokenInfo;
  }

  /**
   * Access Token Expire 여부
   *
   * @static
   * @return {*}  {boolean}
   * @memberof OauthUtils
   */
  public static isTokenExpiry(): boolean {
    const tokenExpiry = moment.unix(OauthUtils.getAccessToken().exp);
    return (
      tokenExpiry.diff(moment(), 'seconds') < OauthUtils.MIN_TOKEN_LIFESPAN
    );
  }

  /**
   * Refresh Token Expire 여부
   *
   * @static
   * @return {*}  {boolean}
   * @memberof OauthUtils
   */
  public static isRefreshTokenExpiry(): boolean {
    const tokenExpiry = moment.unix(OauthUtils.getRefreshToken().exp);
    return (
      tokenExpiry.diff(moment(), 'seconds') < OauthUtils.MIN_TOKEN_LIFESPAN
    );
  }

  /**
   * Storage에 Item 저장
   *
   * @static
   * @param {string} key
   * @param {string} val
   * @memberof OauthUtils
   */
  public static setLocStorage(key: string, val: string): void {
    localStorage.setItem(key, val);
  }

  /**
   * Storage에 등록된 Item 조회
   *
   * @static
   * @param {string} key
   * @return {*}  {(string | null)}
   * @memberof OauthUtils
   */
  public static getLocStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Storage에 등록되 Item 삭제
   *
   * @static
   * @param {string} key
   * @memberof OauthUtils
   */
  public static removeLocStorage(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * 권한 체크
   *
   * @static
   * @param {string} [creid]
   * @return {*}  {boolean}
   * @memberof OauthUtils
   */
  public static isAuthChk(creid?: string): boolean {
    if (!OauthUtils.isToken()) {
      return false;
    }

    const isRoleAdm: boolean =
      OauthUtils.getAccessToken().authorities.indexOf('role_admin') > -1;
    if (isRoleAdm) {
      return true;
    }
    const userid: string | undefined = OauthUtils.getAccessToken().userInfo
      ?.userid;
    if (creid === userid) {
      return true;
    }

    return false;
  }
}
