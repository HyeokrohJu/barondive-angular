import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/shared/guards/auth-guard.service';

import { NoticeComponent } from './notice/notice.component';
import { ReviewComponent } from './review/review.component';
import { DetailComponent } from './detail/detail.component';
import { InsertComponent } from './insert/insert.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'notice',
    component: NoticeComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'notice/detail',
    component: DetailComponent,
  },
  {
    path: 'review/detail',
    component: DetailComponent,
  },
  {
    path: 'notice/insert',
    component: InsertComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'review/insert',
    component: InsertComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'notice/update',
    component: UpdateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'review/update',
    component: UpdateComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'notice', pathMatch: 'full' },
];

export const CommunityRoutes = RouterModule.forChild(routes);
