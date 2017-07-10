import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHomeComponent, AdminCheckinsComponent, AdminMembersComponent } from './admin-child.component';
import { AdminAuthGuard } from './admin-auth-guard.service';

const appRoutes: Routes = [
  { path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'members', component: AdminMembersComponent },
      { path: 'members/:id', component: AdminMembersComponent },
      { path: 'checkins', component: AdminCheckinsComponent }
    ]
  },
];

export const admindashRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
