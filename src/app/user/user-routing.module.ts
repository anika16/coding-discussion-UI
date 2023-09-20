import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAuthGuard } from '../auth-guards/user-guard/user.guard';

const routes: Routes = [
  {path:'dashboard',component: DashboardComponent, canActivate: [UserAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
