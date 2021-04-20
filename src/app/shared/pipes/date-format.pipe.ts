import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

/**
 * DateFormat Pipe
 *
 * @export
 * @class DateFormatPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number | undefined,
    format?: string
  ): string {
    return value ? moment(value).format(format) : '';
  }
}
