import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MainCarousel } from '@app/shared/interfaces';

/**
 * Main Carousel Component
 *
 * @export
 * @class MainCarouselComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCarouselComponent {
  /**
   * Carousel Arrow SVG Icon
   *
   * @type {{ arrowBack: string; arrowForward: string }}
   * @memberof MainCarouselComponent
   */
  public svgIcon: { arrowBack: string; arrowForward: string };

  /**
   * MainCarousel List
   *
   * @type {MainCarousel[]}
   * @memberof MainCarouselComponent
   */
  public mainCarouselList: MainCarousel[] = [
    {
      imagePath: '/assets/images/main/main01.jpg',
      title: 'Barondive',
      subTitle: `Let's keep the Honor of Dive!!`,
      aniPos: 'mov-left-bottom',
    },
    {
      imagePath: '/assets/images/main/main02.jpg',
      title: 'Barondive',
      subTitle: `Let's keep the Honor of Dive!!`,
      aniPos: 'mov-right-bottom',
    },
    {
      imagePath: '/assets/images/main/main03.jpg',
      title: 'Barondive',
      subTitle: `Let's keep the Honor of Dive!!`,
      aniPos: 'mov-right-top',
    },
    {
      imagePath: '/assets/images/main/main04.jpg',
      title: 'Barondive',
      subTitle: `Let's keep the Honor of Dive!!`,
      aniPos: 'mov-left-bottom',
    },
    {
      imagePath: '/assets/images/main/main05.jpg',
      title: 'Barondive',
      subTitle: `Let's keep the Honor of Dive!!`,
      aniPos: 'mov-left-top',
    },
  ];

  public currtCarousel: MainCarousel;

  constructor() {
    this.svgIcon = {
      arrowBack: 'arrowBack',
      arrowForward: 'arrowForward',
    };

    const [currtCarousel] = this.mainCarouselList;
    this.currtCarousel = currtCarousel;
  }

  carouselChange(currtIdx: number): void {
    this.currtCarousel = this.mainCarouselList[currtIdx];
  }
}
