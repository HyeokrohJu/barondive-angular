import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { CommunityRoutes } from './community.routing';
import { DetailComponent } from './detail/detail.component';
import { InsertComponent } from './insert/insert.component';
import { NoticeComponent } from './notice/notice.component';
import { ReviewComponent } from './review/review.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [SharedModule, CommunityRoutes],
  declarations: [
    NoticeComponent,
    ReviewComponent,
    DetailComponent,
    InsertComponent,
    UpdateComponent,
  ],
})
export class CommunityModule {}
