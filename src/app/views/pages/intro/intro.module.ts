import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { BarondiveComponent } from './barondive/barondive.component';
import { ContactComponent } from './contact/contact.component';
import { IntroRoutes } from './intro.routing';

@NgModule({
  imports: [SharedModule, IntroRoutes],
  declarations: [BarondiveComponent, ContactComponent],
})
export class IntroModule {}
