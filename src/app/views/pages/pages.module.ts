import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { PagesRoutes } from './pages.routing';
import { MainComponent } from './main/main.component';
import { IntroComponent } from './intro/intro.component';
import { CostComponent } from './cost/cost.component';
import { StoryComponent } from './story/story.component';
import { CommunityComponent } from './community/community.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MypageComponent } from './mypage/mypage.component';

@NgModule({
  imports: [SharedModule, PagesRoutes],
  declarations: [
    MainComponent,
    IntroComponent,
    CostComponent,
    StoryComponent,
    CommunityComponent,
    ReservationComponent,
    MypageComponent,
  ],
})
export class PagesModule {}
