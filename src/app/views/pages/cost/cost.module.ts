import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { CostRoutes } from './cost.routing';
import { FundivingComponent } from './fundiving/fundiving.component';
import { OtherServiceComponent } from './other-service/other-service.component';
import { TrainingComponent } from './training/training.component';

@NgModule({
  imports: [SharedModule, CostRoutes],
  declarations: [FundivingComponent, TrainingComponent, OtherServiceComponent],
})
export class CostModule {}
