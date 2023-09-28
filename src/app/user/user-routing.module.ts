import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAuthGuard } from '../auth-guards/user-guard/user.guard';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { DashboardSearchComponent } from './components/dashboard-search/dashboard-search.component';

const routes: Routes = [
  {path:'dashboard',component: DashboardComponent, canActivate: [UserAuthGuard]},
  {path:'question',component: PostQuestionComponent, canActivate: [UserAuthGuard]},
  {path:'question/:questionId', component: ViewQuestionComponent, canActivate: [UserAuthGuard]},
  {path: 'askedQuestion', component: DashboardSearchComponent, canActivate: [UserAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
