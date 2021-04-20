import { Routes, RouterModule } from '@angular/router';

import { BarondiveComponent } from './barondive/barondive.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: 'barondive',
    component: BarondiveComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  { path: '', redirectTo: 'barondive', pathMatch: 'full' },
];

export const IntroRoutes = RouterModule.forChild(routes);
