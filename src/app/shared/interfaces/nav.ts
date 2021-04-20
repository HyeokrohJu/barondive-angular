/**
 * NAV API Call Return Data
 *
 * @export
 * @interface ApiNavRoot
 */
export interface ApiNavRoot {
  selectMenuTree: NavList[];
}

/**
 * Navigation List
 *
 * @export
 * @interface NavList
 */
export interface NavList {
  cpath: string;
  credate: number;
  creid: string;
  disporder: number;
  exact: string;
  expyn: string;
  fldyn: string;
  icon: string;
  icontype: string;
  id: string;
  isopen: boolean;
  level: number;
  lvl: number;
  menucd: string;
  menunm: string;
  mtype: string;
  name: string;
  rid: string;
  rolecd: string;
  sgrp: string;
  treeid: string;
  upath: null;
  upddate: number;
  updid: string;
  upmenucd: string;
  useyn: string;
  wdpyn: string;
  children: NavList[];
}

/**
 * Navigation 조회 Parameter
 *
 * @export
 * @interface NavListParam
 */
export interface NavListParam {
  sgrp: string;
  useyn: string;
}
