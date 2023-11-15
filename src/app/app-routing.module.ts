import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { NoAuthGuard } from './auth-guards/noAuth-guard/no-auth.guard';
import { ForgottenPasswordComponent } from './auth-components/forgotten-password/forgotten-password.component';
import { OtpValidatorComponent } from './auth-components/otp-validator/otp-validator.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { ResetPasswordGuard } from './auth-guards/reset-password-guard/reset-password.guard';
import { OtpValidationGuard } from './auth-guards/reset-password-guard/otp-validation.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect '/' to '/login'
  {path: 'login', component:LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'forgotten-password', component:ForgottenPasswordComponent, canActivate: [NoAuthGuard]},
  {path: 'otp-validator', component:OtpValidatorComponent, canActivate: [OtpValidationGuard]},
  {path: 'reset-password', component:ResetPasswordComponent, canActivate: [ResetPasswordGuard]},
  {path:'signup',component:SignupComponent, canActivate: [NoAuthGuard]},
  {path:'user',loadChildren:()=> import("./user/user.module").then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
