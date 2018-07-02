import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminAuthGuard } from './admin-auth-guard.service';
// import { AdminService } from './admin.service';
import { HttpModule } from '@angular/http';
import { admindashRouting } from './admin-dashboard.routing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import {
  AdminMembersComponent,
  AdminActivitiesComponent,
  AdminNewComponent,
  AdminCheckinsComponent,
  AdminRequestsComponent
} from './admin-child.component';

@NgModule({
  imports: [
    admindashRouting,
    FormsModule,
    CommonModule,
    HttpModule
  ],
  providers: [AdminAuthGuard],
  declarations: [
    AdminDashboardComponent,
    AdminMembersComponent,
    AdminNewComponent,
    AdminCheckinsComponent,
    AdminRequestsComponent,
    AdminActivitiesComponent
  ]
})
export class AdminDashModule { }
