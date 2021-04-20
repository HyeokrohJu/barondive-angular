import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Training Component
 *
 * @export
 * @class TrainingComponent
 */
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingComponent {
  public title: string;

  constructor() {
    this.title = '교육다이빙 비용안내';
  }
}
