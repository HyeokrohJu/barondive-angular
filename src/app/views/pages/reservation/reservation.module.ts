import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { ReservationRoutes } from './reservation.routing';
import { RevComponent } from './rev/rev.component';
import { DetailComponent } from './detail/detail.component';
import { InsertComponent } from './insert/insert.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [SharedModule, ReservationRoutes],
  declarations: [
    RevComponent,
    DetailComponent,
    InsertComponent,
    UpdateComponent,
  ],
})
export class ReservationModule {}
