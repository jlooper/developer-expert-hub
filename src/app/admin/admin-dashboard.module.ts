import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminAuthGuard } from './admin-auth-guard.service';
import { HttpModule } from '@angular/http';
import { admindashRouting } from './admin-dashboard.routing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminHomeComponent, AdminMembersComponent, AdminCheckinsComponent } from './admin-child.component';

@NgModule({
  imports:      [ 
    admindashRouting,
    FormsModule,
    CommonModule,
    HttpModule
   ],
   providers: [AdminAuthGuard],
  declarations: [ 
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminMembersComponent,
    AdminCheckinsComponent
  ]
})
export class AdminDashModule { }
