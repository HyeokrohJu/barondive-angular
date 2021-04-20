import { Component } from '@angular/core';

/**
 * Footer Component
 *
 * @export
 * @class FooterComponent
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public address: string;

  public ceoNm: string;

  public tel: string;

  public copyright: string;

  constructor() {
    this.address =
      'K and Y BARON DIVE CENTER Inc. REG NO. CS201915723, Danao, Panglao, Bohol, Philippines, 6340';
    this.ceoNm = '대표 권준혁, 윤영주';
    this.tel = '+63 927 930 2877 토미강사 / +63 977 132 1474 줄리강사';
    this.copyright = 'CopyRight © 2019 BARON DIVE All Rights Reserved.';
  }
}
