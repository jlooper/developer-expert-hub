import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent, AccountComponent, ActivitiesComponent } from './child.component';
import { AuthGuard } from '../auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AccountComponent },
      { path: 'account', component: AccountComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'activities', component: ActivitiesComponent }
    ]
  },
];

export const dashRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
