import { forkJoin } from 'rxjs';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AttachService, BltService } from '@app/shared/api';
import { AttachDesc, BltDesc, BltParam } from '@app/shared/interfaces';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {
  public bltParam!: BltParam;

  public qParams: Params | undefined;

  public bltDesc!: BltDesc;

  public attachList: AttachDesc[] = [] as AttachDesc[];

  public editorAttachList: AttachDesc[] = [] as AttachDesc[];

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private acRoute: ActivatedRoute,
    private bltServ: BltService,
    private attachServ: AttachService
  ) {
    this.bltParam = {
      brdid: 'BRD0000006',
      bltid: 0,
    };
  }

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.bltParam.bltid = Number(this.qParams.bltid);

    this.apiCall();
  }

  apiCall(): void {
    forkJoin({
      rRes: this.bltServ.getBltDesc(this.bltParam),
      aRes: this.attachServ.getAttachList({
        tblnm: 'hrpj_blt',
        tblkey: this.bltParam.bltid,
        editoryn: 'N',
      }),
      eaRes: this.attachServ.getAttachList({
        tblnm: 'hrpj_blt',
        tblkey: this.bltParam.bltid,
        editoryn: 'Y',
      }),
    })
      .pipe(untilDestroyed(this))
      .subscribe(({ rRes, aRes, eaRes }) => {
        this.bltDesc = rRes;
        this.attachList = aRes;
        this.editorAttachList = eaRes;

        this.cdRef.detectChanges();
      });
  }

  updProc(): void {
    this.router.navigate([`/mypage/revlist/detail`], {
      queryParams: { ...this.qParams },
    });
  }
}
