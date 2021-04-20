import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { AnyRoutes } from './any.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [SharedModule, AnyRoutes],
  declarations: [LoginComponent, SignupComponent],
})
export class AnyModule {}
