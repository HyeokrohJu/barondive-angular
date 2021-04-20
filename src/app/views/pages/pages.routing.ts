import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/shared/guards/auth-guard.service';

import { MainComponent } from './main/main.component';
import { IntroComponent } from './intro/intro.component';
import { CostComponent } from './cost/cost.component';
import { StoryComponent } from './story/story.component';
import { CommunityComponent } from './community/community.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MypageComponent } from './mypage/mypage.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'intro',
    component: IntroComponent,
    loadChildren: () =>
      import('app/views/pages/intro/intro.module').then(
        (mod) => mod.IntroModule
      ),
  },
  {
    path: 'cost',
    component: CostComponent,
    loadChildren: () =>
      import('app/views/pages/cost/cost.module').then((mod) => mod.CostModule),
  },
  {
    path: 'story',
    component: StoryComponent,
    loadChildren: () =>
      import('app/views/pages/story/story.module').then(
        (mod) => mod.StoryModule
      ),
  },
  {
    path: 'community',
    component: CommunityComponent,
    loadChildren: () =>
      import('app/views/pages/community/community.module').then(
        (mod) => mod.CommunityModule
      ),
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    loadChildren: () =>
      import('app/views/pages/reservation/reservation.module').then(
        (mod) => mod.ReservationModule
      ),
  },
  {
    path: 'mypage',
    component: MypageComponent,
    loadChildren: () =>
      import('app/views/pages/mypage/mypage.module').then(
        (mod) => mod.MypageModule
      ),
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

export const PagesRoutes = RouterModule.forChild(routes);
