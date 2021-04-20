import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Fundiving Component
 *
 * @export
 * @class FundivingComponent
 */
@Component({
  selector: 'app-fundiving',
  templateUrl: './fundiving.component.html',
  styleUrls: ['./fundiving.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundivingComponent {
  public title: string;

  constructor() {
    this.title = '펀다이빙 비용 안내';
  }
}
