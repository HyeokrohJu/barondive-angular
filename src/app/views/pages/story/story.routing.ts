import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/shared/guards/auth-guard.service';

import { BaronstoryComponent } from './baronstory/baronstory.component';
import { DetailComponent } from './detail/detail.component';
import { InsertComponent } from './insert/insert.component';
import { TourstoryComponent } from './tourstory/tourstory.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'baronstory',
    component: BaronstoryComponent,
  },
  {
    path: 'tourstory',
    component: TourstoryComponent,
  },
  {
    path: 'baronstory/detail',
    component: DetailComponent,
  },
  {
    path: 'tourstory/detail',
    component: DetailComponent,
  },
  {
    path: 'baronstory/insert',
    component: InsertComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tourstory/insert',
    component: InsertComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'baronstory/update',
    component: UpdateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tourstory/update',
    component: UpdateComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', redirectTo: 'baronstory', pathMatch: 'full' },
];

export const StoryRoutes = RouterModule.forChild(routes);
