import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Contact Component
 *
 * @export
 * @class ContactComponent
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  public title: string;

  constructor() {
    this.title = '오시는 길';
  }
}
