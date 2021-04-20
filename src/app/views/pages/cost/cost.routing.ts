import { Routes, RouterModule } from '@angular/router';

import { FundivingComponent } from './fundiving/fundiving.component';
import { OtherServiceComponent } from './other-service/other-service.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {
    path: 'fundiving',
    component: FundivingComponent,
  },
  {
    path: 'training',
    component: TrainingComponent,
  },
  {
    path: 'otherservice',
    component: OtherServiceComponent,
  },
  { path: '', redirectTo: 'fundiving', pathMatch: 'full' },
];

export const CostRoutes = RouterModule.forChild(routes);
