import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { CanonicalService } from './shared/services';

/**
 * APP Component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private metaTagServ: Meta,
    private canonicalServ: CanonicalService
  ) {}

  ngOnInit(): void {
    this.metaTagServ.addTags([
      {
        name: 'keywords',
        content:
          '바론다이브, BaronDive, 보홀, 필리핀 다이빙, 보홀 다이빙, 스쿠버다이빙, 펀다이빙, ScubaDiving, 스킨스쿠버',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'BaronDive' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
    this.canonicalServ.setCanonicalURL();
  }
}
