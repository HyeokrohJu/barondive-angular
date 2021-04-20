import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * HEAD에 Canonical 등록
 * SEO(Search Engine Optimization) 처리를 위한 Service
 *
 * @export
 * @class CanonicalService
 */
@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  /**
   * Canonical URL 등록
   *
   * @param {string} [url]
   * @memberof CanonicalService
   */
  setCanonicalURL(url?: string): void {
    const canURL: string = !url ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}
