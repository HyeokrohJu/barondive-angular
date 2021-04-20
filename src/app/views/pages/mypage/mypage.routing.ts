import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/shared/guards/auth-guard.service';

import { RevlistComponent } from './revlist/revlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'userinfo',
    component: UserinfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'revlist',
    component: RevlistComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'revlist/detail',
    component: DetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'revlist/update',
    component: UpdateComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'userinfo', pathMatch: 'full' },
];

export const MypageRoutes = RouterModule.forChild(routes);
