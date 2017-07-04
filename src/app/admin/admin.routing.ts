import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../auth/admin-auth-guard.service';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
