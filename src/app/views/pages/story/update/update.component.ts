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
import { OauthUtils } from '@app/shared/utils';

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

  private pType!: string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private acRoute: ActivatedRoute,
    private bltServ: BltService,
    private attachServ: AttachService
  ) {
    this.bltParam = {
      brdid: 'BRD0000001',
      bltid: 0,
    };
  }

  ngOnInit(): void {
    this.qParams = this.acRoute.snapshot.queryParams;
    this.bltParam.bltid = Number(this.qParams.bltid);
    this.pType = this.qParams.type || 'baronstory';

    if (!OauthUtils.isAuthChk()) {
      alert('스토리는 관리자만 수정 가능합니다.');

      this.router.navigate([`/story/${this.pType}`], {
        queryParams: { ...this.qParams, type: null },
      });
      return;
    }

    if (this.pType === 'tourstory') {
      this.bltParam.brdid = 'BRD0000002';
    } else {
      this.bltParam.brdid = 'BRD0000001';
    }

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
    this.router.navigate([`/story/${this.pType}/detail`], {
      queryParams: { ...this.qParams },
    });
  }
}
