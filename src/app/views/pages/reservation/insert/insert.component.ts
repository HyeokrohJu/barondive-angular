import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertComponent implements OnInit {
  public qParams: Params | undefined;

  public brdid!: string;

  constructor(private router: Router, private acRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.brdid = 'BRD0000006';
  }

  changeList(): void {
    this.router.navigate(['/reservation/rev'], {
      queryParams: { ...this.qParams, type: null },
    });
  }

  insProc(): void {
    this.router.navigate(['/reservation/rev'], {
      queryParams: { ...this.qParams, currtPg: 1, type: null },
    });
  }
}
