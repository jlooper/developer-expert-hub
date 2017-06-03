import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent, AccountComponent, ActivitiesComponent, RequestComponent } from './child.component';
import { AuthGuard } from '../auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'account', component: AccountComponent },
      { path: 'requests', component: RequestComponent },
      { path: 'activities', component: ActivitiesComponent }
    ]
  },
];

export const dashRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
