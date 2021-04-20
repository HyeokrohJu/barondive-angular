import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OauthUtils } from '@app/shared/utils';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertComponent implements OnInit {
  public qParams: Params | undefined;

  private pType!: string;

  public brdid!: string;

  constructor(private router: Router, private acRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.pType = this.qParams.type || 'baronstory';

    if (!OauthUtils.isAuthChk()) {
      alert('스토리는 관리자만 등록 가능합니다.');

      this.router.navigate([`/story/${this.pType}`], {
        queryParams: { ...this.qParams, type: null },
      });
      return;
    }

    if (this.pType === 'baronstory') {
      this.brdid = 'BRD0000001';
    } else {
      this.brdid = 'BRD0000002';
    }
  }

  changeList(): void {
    this.router.navigate([`/story/${this.pType}`], {
      queryParams: { ...this.qParams, type: null },
    });
  }

  insProc(): void {
    this.router.navigate([`/story/${this.pType}`], {
      queryParams: { ...this.qParams, currtPg: 1, type: null },
    });
  }
}
