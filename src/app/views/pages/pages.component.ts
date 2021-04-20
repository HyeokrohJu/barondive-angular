import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SubVisual, SubVisualList } from '@app/shared/interfaces';

/**
 * Pages Component
 *
 * @export
 * @class PagesComponent
 * @implements {OnInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnInit {
  public isMain: boolean | undefined;

  public currentVisual: SubVisual;

  private subVisual: SubVisualList = {
    '/intro/barondive': {
      title: 'Baron Dive & Staff',
      imgUrl: '/assets/images/visual/visual01.jpg',
    },
    '/intro/contact': {
      title: 'Contact',
      imgUrl: '/assets/images/visual/visual02.jpg',
    },
    '/cost/fundiving': {
      title: 'Fun Diving',
      imgUrl: '/assets/images/visual/visual03.jpg',
    },
    '/cost/training': {
      title: 'Training',
      imgUrl: '/assets/images/visual/visual04.jpg',
    },
    '/cost/otherservice': {
      title: 'Other Service',
      imgUrl: '/assets/images/visual/visual05.jpg',
    },
    '/story/baronstory': {
      title: 'Baron Story',
      imgUrl: '/assets/images/visual/visual06.jpg',
    },
    '/story/tourstory': {
      title: 'Tour Story',
      imgUrl: '/assets/images/visual/visual07.jpg',
      theme: 'dark',
    },
    '/community/notice': {
      title: 'Notice',
      imgUrl: '/assets/images/visual/visual08.jpg',
    },
    '/community/review': {
      title: 'Review',
      imgUrl: '/assets/images/visual/visual09.jpg',
    },
    '/reservation/rev': {
      title: 'Reservation',
      imgUrl: '/assets/images/visual/visual10.jpg',
    },
    '/mypage/userinfo': {
      title: '회원정보',
      imgUrl: '/assets/images/visual/visual01.jpg',
    },
    '/mypage/revlist': {
      title: '예약내역',
      imgUrl: '/assets/images/visual/visual02.jpg',
    },
  };

  constructor(
    private router: Router,
    private acRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.currentVisual = this.subVisual['/intro/barondive'];
  }

  ngOnInit(): void {
    this.initRoute();
  }

  /**
   * Route 이벤트 처리
   *
   * @memberof PagesComponent
   */
  initRoute(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe((event: NavigationEnd) => {
        if (this.subVisual[this.visualKey(this.router.url)]) {
          this.currentVisual = this.subVisual[this.visualKey(this.router.url)];
        }

        if (event.urlAfterRedirects === '/main') {
          this.isMain = true;
          this.cdRef.detectChanges();
        } else if (this.isMain) {
          this.isMain = false;
          this.cdRef.detectChanges();
        }
      });

    if (this.acRoute.snapshot.children[0].url[0].path === 'main') {
      this.isMain = true;
      this.cdRef.detectChanges();
    }

    const uri: string = _.split(this.router.url, '?')[0];
    this.currentVisual = this.subVisual[this.visualKey(uri)] || '';
  }

  /**
   * Visual Key 조회
   *
   * @param {string} rUrl
   * @return {*}  {string}
   * @memberof PagesComponent
   */
  visualKey(rUrl: string): string {
    const tmpArr: string[] = _.filter(rUrl.split('/'), (item, idx) => idx < 3);
    return tmpArr.join('/');
  }
}
