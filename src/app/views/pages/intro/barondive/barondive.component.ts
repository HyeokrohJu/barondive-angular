import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Barondive Component
 *
 * @export
 * @class BarondiveComponent
 */
@Component({
  selector: 'app-barondive',
  templateUrl: './barondive.component.html',
  styleUrls: ['./barondive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarondiveComponent {
  public title: string;

  constructor() {
    this.title = 'Baron Dive';
  }
}
