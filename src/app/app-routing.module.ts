import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnyComponent } from './views/any/any.component';
import { ErrorComponent } from './views/error/error.component';
import { PagesComponent } from './views/pages/pages.component';

/**
 * APP Route 세팅
 */
const routes: Routes = [
  {
    path: 'any',
    component: AnyComponent,
    loadChildren: () =>
      import('app/views/any/any.module').then((mod) => mod.AnyModule),
    canActivate: [],
  },
  {
    path: '',
    component: PagesComponent,
    loadChildren: () =>
      import('app/views/pages/pages.module').then((mod) => mod.PagesModule),
    canActivate: [],
  },
  { path: '**', component: ErrorComponent },
];

/**
 * APP Route 모듈
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
