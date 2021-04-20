import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Other Service Component
 *
 * @export
 * @class OtherServiceComponent
 */
@Component({
  selector: 'app-other-service',
  templateUrl: './other-service.component.html',
  styleUrls: ['./other-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherServiceComponent {
  public title: string;

  constructor() {
    this.title = '픽업/드랍';
  }
}
