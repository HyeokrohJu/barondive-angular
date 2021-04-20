/**
 * 리스트 테이블 관련 Item
 *
 * @export
 * @interface ListTable
 */
export interface ListTable {
  dpCol: string[];
  colNms: {
    [key: string]: {
      name: string;
      width: number;
      align?: string;
      type?: string;
      format?: string;
    };
  };
  defNum?: number;
}
