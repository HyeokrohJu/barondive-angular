import { Observable, ReplaySubject } from 'rxjs';

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Ext Lib Lazy Load
 *
 * @export
 * @class LazyLoadLibService
 */
@Injectable({
  providedIn: 'root',
})
export class LazyLoadLibService {
  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

  constructor(@Inject(DOCUMENT) private readonly document: any) {}

  loadScript(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next();
      this._loadedLibraries[url].complete();
    };

    this.document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }
}
