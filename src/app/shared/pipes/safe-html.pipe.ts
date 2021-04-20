import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Safe Html Pipe
 *
 * @export
 * @class SafeHtmlPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(html: string | undefined): SafeHtml {
    if (!html) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
