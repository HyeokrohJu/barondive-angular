import { YN } from './base';

/**
 * 댓글 리스트 조회 Parameter
 *
 * @export
 * @interface BltcmntParam
 */
export interface BltcmntParam {
  brdid: string;
  bltid: number;
  itemsPerPage: number;
  currentPageNo: number;
}

/**
 * BLTCMNT API Call Return Data
 *
 * @export
 * @interface ApiBltcmntRoot
 */
export interface ApiBltcmntRoot {
  selectBltcmntCnt: {
    cnt: number;
  };
  selectBltcmntPg: BltcmntDesc[];
}

/**
 * 댓글 상세 Item
 *
 * @export
 * @interface BltcmntDesc
 */
export interface BltcmntDesc {
  bltid: number;
  brdid: string;
  cmnt: string;
  cmntid: number;
  credate: number;
  creid: string;
  creip: string;
  crenm: string;
  custom1: string;
  custom2: string;
  custom3: string;
  disporder: number;
  lvl: number;
  orgcmntid: number;
  rcmdcnt: number;
  replycnt: number;
  state: string;
  upcmntid: 0;
  upddate: number;
  updid: string;
  updip: string;
  updnm: string;
}

/**
 * 댓글 등록 Parameter
 *
 * @export
 * @interface BltcmntInsParam
 */
export interface BltcmntInsParam {
  brdid: string;
  bltid: number;
  cmnt: string;
  state: string;
  rcmdcnt: string;
  currtcmntid?: number;
}

/**
 * 댓글 수정 Parameter
 *
 * @export
 * @interface BltcmntUpdParam
 */
export interface BltcmntUpdParam {
  cmntid: number;
  cmnt: string;
}

/**
 * 댓글 삭제 Parameter
 *
 * @export
 * @interface BltcmntDelParam
 */
export interface BltcmntDelParam {
  cmntid: number;
  state: string;
  return: number;
}
