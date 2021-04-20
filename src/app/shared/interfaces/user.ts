import { SEX, YN } from './base';

/**
 * Login Parameter
 *
 * @export
 * @interface LoginParams
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * oAuth2 Parameter
 *
 * @export
 * @interface OAuth2Params
 */
export interface OAuth2Params extends LoginParams {
  grant_type: string;
  client_id: string;
  scope: string;
  hrschema: string;
  hrifschema: string;
  hrtimezone: string;
}

/**
 * JWT 정보
 *
 * @export
 * @interface OAuth2JWT
 */
export interface OAuth2JWT {
  access_token: string;
  authorities: string[];
  expires_in: number;
  jti: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  hrschema?: string;
  hrtimezone?: string;
  userInfo?: UserInfo;
}

/**
 * User Info
 *
 * @export
 * @interface UserInfo
 */
export interface UserInfo {
  compid: string;
  compnm: string;
  deptid: string;
  deptnm: string;
  email: string;
  loginid: string;
  posnm: string;
  sgrp: string;
  userid: string;
  usernm: string;
}

/**
 * LocalStorage에 저장된 Token 정보
 *
 * @export
 * @interface StorageToken
 */
export interface StorageToken {
  access_token: string;
  refresh_token: string;
}

/**
 * Access Token 정보
 *
 * @export
 * @interface AccessTokenInfo
 */
export interface AccessTokenInfo {
  authorities: string[];
  client_id: string;
  exp: number;
  jti: string;
  scope: string[];
  hrschema?: string;
  hrtimezone?: string;
  userInfo?: UserInfo;
  user_name?: string;
}

/**
 * Refresh Token 정보
 *
 * @export
 * @interface RefreshTokenInfo
 * @extends {AccessTokenInfo}
 */
export interface RefreshTokenInfo extends AccessTokenInfo {
  ati: string;
}

/**
 * 아이디 찾기 Parameter
 *
 * @export
 * @interface FindIdParam
 */
export interface FindIdParam {
  type: string;
  val: string;
}

/**
 * Member Api Root Response
 *
 * @export
 * @interface ApiMemberRoot
 */
export interface ApiMemberRoot {
  getFindId?: IdFindRes[];
  isChangePwd?: boolean;
  getMember?: MemberInfo;
  userid?: string;
}

/**
 * 아이디 찾기 Response
 *
 * @export
 * @interface IdFindRes
 */
export interface IdFindRes {
  loginid: string;
}

/**
 * 비밀번호 찾기 Response
 *
 * @export
 * @interface PwdFindRes
 */
export interface PwdFindRes {
  isChangePwd: string;
}

/**
 * 비밀번호 찾기 Parameter
 *
 * @export
 * @interface FindPwdParam
 */
export interface FindPwdParam {
  loginid: string;
  email: string;
}

/**
 * 회원가입 Parameter
 *
 * @export
 * @interface InsJoinParam
 */
export interface InsJoinParam {
  loginid: string;
  passwd: string;
  usernm: string;
  email: string;
  mphone: string;
  sex: SEX;
  useyn: YN;
  roleid: string;
  state: string;
}

/**
 * 회원정보 조회 Parameter
 *
 * @export
 * @interface MemberInfoParam
 */
export interface MemberInfoParam {
  userid: string;
}

/**
 * 회원 정보
 *
 * @export
 * @interface MemberInfo
 */
export interface MemberInfo {
  addr1: string;
  addr2: string;
  compid: string;
  compnm: string;
  credate: number;
  custom1: string;
  custom2: string;
  custom3: string;
  deptid: string;
  deptnm: string;
  disporder: number;
  email: string;
  hphone: string;
  loginid: string;
  mphone: string;
  passwd: string;
  passwdfailcnt: number;
  roleid: string;
  sex: SEX;
  state: string;
  upddate: number;
  updid: string;
  userid: string;
  usernm: string;
  useyn: YN;
  zipcd: string;
}
