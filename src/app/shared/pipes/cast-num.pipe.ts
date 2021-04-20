import { Pipe, PipeTransform } from '@angular/core';

/**
 * Number Type으로 Casting
 *
 * @export
 * @class CastNumPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'castNum',
})
export class CastNumPipe implements PipeTransform {
  transform(value: any): any {
    return Number(value);
  }
}
