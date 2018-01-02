import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, SignupComponent, ResetpassComponent, SuccessComponent } from './auth.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-reset', component: ResetpassComponent },
  { path: 'success', component: SuccessComponent }
];

export const authRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
