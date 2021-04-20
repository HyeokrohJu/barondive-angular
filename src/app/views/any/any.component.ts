import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-any',
  templateUrl: './any.component.html',
  styleUrls: ['./any.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnyComponent implements OnInit {
  private title = '';

  ngOnInit(): void {
    this.title = 'Any Component';
  }
}
