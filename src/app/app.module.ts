import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ForgottenPasswordComponent } from './auth-components/forgotten-password/forgotten-password.component';
import { OtpValidatorComponent } from './auth-components/otp-validator/otp-validator.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SearchBarComponent,
    ForgottenPasswordComponent,
    OtpValidatorComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
