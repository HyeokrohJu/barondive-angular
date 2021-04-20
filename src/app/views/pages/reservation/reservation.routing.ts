import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/shared/guards/auth-guard.service';

import { RevComponent } from './rev/rev.component';
import { DetailComponent } from './detail/detail.component';
import { InsertComponent } from './insert/insert.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'rev',
    component: RevComponent,
  },
  {
    path: 'rev/detail',
    component: DetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'rev/insert',
    component: InsertComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'rev/update',
    component: UpdateComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'rev', pathMatch: 'full' },
];

export const ReservationRoutes = RouterModule.forChild(routes);
