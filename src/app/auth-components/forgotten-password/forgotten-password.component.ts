import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  forgotPasswordForm!:FormGroup;

  constructor( 
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private snackBar:MatSnackBar){
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
     email:['', Validators.required],
    })
   }

  submitEmail(){
    this.service.forgotPassword(
      this.forgotPasswordForm.get(['email'])!.value
    ).subscribe(
      (response)=>{
      console.log(response);
        
    },
      error=>{
        if(error.error){
          this.snackBar.open(error.error, 'Close', {duration: 5000})
        }else{
          this.snackBar.open("Something went wrong, Please try again later.", 'Close', {duration: 5000})
        }
        StorageService.removeOtpUser();
        this.router.navigateByUrl("login");
      }
    )
    this.storageService.saveUserForOtp(this.forgotPasswordForm.get(['email'])!.value);
    this.router.navigateByUrl("otp-validator");
  }

}
