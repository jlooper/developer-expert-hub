import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRouting } from './admin.routing';
import { AdminAuthGuard } from '../auth/admin-auth-guard.service'
@NgModule({
  imports: [
    CommonModule,
    adminRouting
  ],
  providers: [AdminAuthGuard],
  declarations: [AdminComponent]
})
export class AdminModule { }
