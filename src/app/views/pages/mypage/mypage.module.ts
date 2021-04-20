import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { MypageRoutes } from './mypage.routing';
import { RevlistComponent } from './revlist/revlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [SharedModule, MypageRoutes],
  declarations: [
    UserinfoComponent,
    RevlistComponent,
    DetailComponent,
    UpdateComponent,
  ],
})
export class MypageModule {}
