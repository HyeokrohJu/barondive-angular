import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { StoryRoutes } from './story.routing';
import { BaronstoryComponent } from './baronstory/baronstory.component';
import { TourstoryComponent } from './tourstory/tourstory.component';
import { DetailComponent } from './detail/detail.component';
import { InsertComponent } from './insert/insert.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [SharedModule, StoryRoutes],
  declarations: [
    BaronstoryComponent,
    TourstoryComponent,
    DetailComponent,
    InsertComponent,
    UpdateComponent,
  ],
})
export class StoryModule {}
