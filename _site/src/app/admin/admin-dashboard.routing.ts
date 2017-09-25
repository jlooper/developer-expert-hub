import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminNewComponent, AdminActivitiesComponent, AdminCheckinsComponent, AdminRequestsComponent, AdminMembersComponent } from './admin-child.component';
import { AdminAuthGuard } from './admin-auth-guard.service';

const appRoutes: Routes = [
  { path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', component: AdminMembersComponent },
      { path: 'members', component: AdminMembersComponent },
      { path: 'new', component: AdminNewComponent },
      //{ path: 'members/:id', component: AdminMembersComponent },
      { path: 'checkins', component: AdminCheckinsComponent },
      { path: 'requests', component: AdminRequestsComponent },
      { path: 'activities', component: AdminActivitiesComponent }
    ]
  },
];

export const admindashRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
