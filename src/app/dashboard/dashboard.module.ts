import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthGuard } from '../auth/auth-guard.service';
import { HttpModule } from '@angular/http';
import { dashRouting } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent, AccountComponent, ActivitiesComponent, RequestComponent, CheckinsComponent } from './child.component';

@NgModule({
  imports: [
    dashRouting,
    FormsModule,
    CommonModule,
    HttpModule
  ],
  providers: [AuthGuard],
  declarations: [
    DashboardComponent,
    AccountComponent,
    HomeComponent,
    ActivitiesComponent,
    RequestComponent,
    CheckinsComponent
  ]
})
export class DashModule { }
