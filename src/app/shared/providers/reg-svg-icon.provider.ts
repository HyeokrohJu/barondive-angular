import { RegSvgIconService } from '@app/shared/services';

/**
 * Svg Icon MatIcon Registry 등록 Provider
 *
 * @export
 * @param {RegSvgIconService} regSvgIconServ
 * @return {*}  {() => void}
 */
export function regSvgIconProvider(
  regSvgIconServ: RegSvgIconService
): () => void {
  return () => {
    regSvgIconServ.init();
  };
}
