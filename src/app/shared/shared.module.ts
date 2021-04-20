import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { MatCarouselModule } from 'ng-mat-carousel';
import { CKEditorModule } from 'ckeditor4-angular';

import { CanonicalService } from './services';
import { CustomPaginatorDirective, StickyPopoverDirective } from './directives';
import {
  CardPortletComponent,
  FooterComponent,
  ListPortletComponent,
  MainCarouselComponent,
  TopGnbComponent,
  TopSnsComponent,
  SubVisualComponent,
  ImgListComponent,
  ListComponent,
  AsideComponent,
  DetailViewComponent,
  CommentComponent,
  InsertViewComponent,
  PluploadComponent,
  MultiImgUploadComponent,
  UpdateViewComponent,
  IdFindComponent,
  PwdFindComponent,
} from './components';
import { NavService } from './api';
import {
  CastNumPipe,
  DateFormatPipe,
  RemoveTagPipe,
  SafeHtmlPipe,
} from './pipes';
import { MOMENT_DATE, MOMENT_FULL_DATE, MOMENT_MIN_DATE } from './providers';

/**
 * 공유 모듈
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    NgbPopoverModule,
    AngularStickyThingsModule,
    MatCarouselModule,
    CKEditorModule,
  ],
  providers: [
    { provide: 'CANONICAL_SERVICE', useClass: CanonicalService },
    { provide: MOMENT_FULL_DATE, useValue: 'YYYY.MM.DD HH:mm:ss' },
    { provide: MOMENT_MIN_DATE, useValue: 'YYYY.MM.DD HH:mm' },
    { provide: MOMENT_DATE, useValue: 'YYYY.MM.DD' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    NavService,
  ],
  declarations: [
    CustomPaginatorDirective,
    StickyPopoverDirective,

    CastNumPipe,
    DateFormatPipe,
    RemoveTagPipe,
    SafeHtmlPipe,

    AsideComponent,
    CardPortletComponent,
    CommentComponent,
    DetailViewComponent,
    FooterComponent,
    IdFindComponent,
    ImgListComponent,
    InsertViewComponent,
    ListComponent,
    ListPortletComponent,
    MainCarouselComponent,
    MultiImgUploadComponent,
    PluploadComponent,
    PwdFindComponent,
    SubVisualComponent,
    TopSnsComponent,
    TopGnbComponent,
    UpdateViewComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    NgbPopoverModule,
    AngularStickyThingsModule,
    MatCarouselModule,
    CKEditorModule,

    CustomPaginatorDirective,
    StickyPopoverDirective,

    CastNumPipe,
    DateFormatPipe,
    RemoveTagPipe,
    SafeHtmlPipe,

    AsideComponent,
    CardPortletComponent,
    CommentComponent,
    DetailViewComponent,
    FooterComponent,
    IdFindComponent,
    ImgListComponent,
    InsertViewComponent,
    ListComponent,
    ListPortletComponent,
    MainCarouselComponent,
    MultiImgUploadComponent,
    PluploadComponent,
    PwdFindComponent,
    SubVisualComponent,
    TopGnbComponent,
    TopSnsComponent,
    UpdateViewComponent,
  ],
})
export class SharedModule {}
