import { YN } from './base';

/**
 * 게시물 상세 조회 Parameter
 *
 * @export
 * @interface BltParam
 */
export interface BltParam {
  brdid: string;
  bltid: number;
}

/**
 * 게시물 상세 Item
 *
 * @export
 * @interface BltDesc
 */
export interface BltDesc {
  annyn: YN;
  attachyn: YN;
  bltenddt: number;
  bltid: number;
  bltstartdt: number;
  brdid: string;
  clickcnt: number;
  cmntcnt: number;
  cmntyn: YN;
  cont: string;
  credate: number;
  creid: string;
  creip: string;
  crenm: string;
  custom1: string;
  custom2: string;
  custom3: string;
  disporder: number;
  filethumb: string;
  headline: string;
  headlineyn: YN;
  imptyn: YN;
  lvl: number;
  oppcnt: number;
  orgbltid: number;
  postdtyn: YN;
  pwdyn: YN;
  rcmdcnt: number;
  replycnt: number;
  replyyn: YN;
  secretyn: YN;
  shareyn: YN;
  state: string;
  title: string;
  upbltid: number;
  upddate: number;
  updid: string;
  updip: string;
  updnm: string;
  cntcmnt: number;
}

/**
 * BLT API Call Return Data
 *
 * @export
 * @interface ApiNavRoot
 */
export interface ApiBltRoot {
  getBlt?: BltDesc;
  selectBltCnt?: {
    cnt: number;
  };
  selectBltPg?: BltDesc[];
  selectRevPg?: BltDesc[];

  updateCntBlt?: boolean;
}

/**
 * 게시물 조회 Parameter
 *
 * @export
 * @interface BltListParam
 */
export interface BltListParam {
  brdid: string;
  currentPageNo: number;
  itemsPerPage: number;
  searchtxt?: string;
  searchtype?: string;
  creid?: string;
}

/**
 * 게시물 등록 Parameter
 *
 * @export
 * @interface BltInsParam
 */
export interface BltInsParam {
  brdid: string;
  state: string;
  title: string;
  cont: string;
  replycnt: number;
  cmntcnt: number;
  clickcnt: number;
  rcmdcnt: number;
  oppcnt: number;
  imptyn: YN;
  secretyn: YN;
  pwdyn: YN;
  attachyn: YN;
  cmntyn: YN;
  replyyn: YN;
  headlineyn: YN;
  headline: string;
  postdtyn: YN;
  annyn: YN;
  shareyn: YN;

  currtbltid?: string;
  tempkey?: string;
  tblnm?: string;
  thumbid?: string;
}

/**
 * 예약리스트 Parameter
 *
 * @export
 * @interface RevParam
 */
export interface RevParam {
  creid: string;
  ordercol: string;
  ordertype: string;
}
