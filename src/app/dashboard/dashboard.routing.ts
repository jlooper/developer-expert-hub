import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent, AccountComponent, ActivitiesComponent, RequestComponent, CheckinsComponent } from './child.component';
import { AuthGuard } from '../auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'account', component: AccountComponent },
      { path: 'requests', component: RequestComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'checkins', component: CheckinsComponent }
    ]
  },
];

export const dashRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
