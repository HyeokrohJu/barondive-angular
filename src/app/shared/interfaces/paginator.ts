/**
 * 페이징 관련
 *
 * @export
 * @interface Paginator
 */
export interface Paginator {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

/**
 * 페이징 클릭시 Return Item
 *
 * @export
 * @interface PageItem
 */
export interface PageItem {
  pageIndex: number;
  pageSize: number;
  length: number;
  previousPageIndex?: number;
}
