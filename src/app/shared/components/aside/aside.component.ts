import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Aside Component
 *
 * @export
 * @class AsideComponent
 */
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  public title!: string;

  constructor() {
    this.title = '입금 계좌';
  }
}
