import * as _ from 'lodash';

import { Pipe, PipeTransform } from '@angular/core';

/**
 * HTML Tag 제거 Pipe
 *
 * @export
 * @class RemoveTagPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'removeTag',
})
export class RemoveTagPipe implements PipeTransform {
  transform(
    value: string | undefined,
    isEscape?: boolean,
    isLeftTrim?: boolean
  ): string {
    const rex = /(<([^>]+)>)/gi;
    const nwValue: string = isEscape
      ? _.unescape(value || '').replace(/&nbsp;/gi, '')
      : value || '';
    return isLeftTrim
      ? _.trimStart(nwValue.replace(rex, ''))
      : nwValue.replace(rex, '');
  }
}
