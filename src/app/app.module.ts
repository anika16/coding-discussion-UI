import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginComponent } from './auth-components/login/login.component';
import { SignupComponent } from './auth-components/signup/signup.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { HttpClient, HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ForgottenPasswordComponent } from './auth-components/forgotten-password/forgotten-password.component';
import { OtpValidatorComponent } from './auth-components/otp-validator/otp-validator.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { ConfigService } from './config.service';
import { resolve } from 'path';
import { url } from 'inspector';
import { environment } from 'src/environments/environment.prod';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { tap } from 'rxjs';
import {MatDialogModule} from '@angular/material/dialog';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SearchBarComponent,
    ForgottenPasswordComponent,
    OtpValidatorComponent,
    ResetPasswordComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent
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
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {

        const http = inject(HttpClient);
        const configService = inject(ConfigService);
        return () => new Promise(resolve => {
          if (environment.production) {
            http.get('assets/config.json')
              .pipe(
                tap((data: any) => {
                  configService.baseUrl = data.apiUrl;
                  resolve(true);
                })
              ).subscribe();
          }
          else{
            const settings = require('../assets/config.json')
            configService.baseUrl = settings.apiUrl;
            resolve(true);
          }
        })
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
