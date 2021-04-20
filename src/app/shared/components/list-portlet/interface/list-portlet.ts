/**
 * List Portlet Data
 *
 * @export
 * @interface ListPortletData
 */
export interface ListPortletData {
  brdid: string;
  bltid: number;
  title: string | undefined;
  dateTime: string | number | undefined;
  isNew: boolean;
  link: string | undefined;
}
