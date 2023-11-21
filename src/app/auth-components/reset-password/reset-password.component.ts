import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.auth-service/auth.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!:FormGroup;


  constructor(
    private service: AuthService, 
    private fb: FormBuilder,
    private router: Router,
    private snackBar:MatSnackBar){}

  ngOnInit(): void {

    this.resetForm = this.fb.group({
      email:[StorageService.getOtpUser(), Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required]
     },{ validator:this.confirmationValidator}) 
  }

  private confirmationValidator(fg:FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
  
    if(password !== confirmPassword){
      fg.get('confirmPassword')?.setErrors({ passwordMismatch :true});
    }
    else{
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  resetPassword(){
    this.service.resetPassword(
      this.resetForm.get(['email'])!.value,
      this.resetForm.get(['password'])!.value
    ).subscribe(
      (response)=>{
      console.log(response);
      this.snackBar.open("Password reset successful", 'Close', {duration: 5000})
      this.router.navigateByUrl("login");
    },
      error=>{
        if(error.error){
          this.snackBar.open(error.error, 'Close', {duration: 5000})
        }else{
          this.snackBar.open("Something went wrong, Please try again later.", 'Close', {duration: 5000})
        }
        StorageService.removeOtpUser();
        StorageService.removeOtpValidated();
        this.router.navigateByUrl("login");
      }
    )  
    StorageService.removeOtpUser();
    StorageService.removeOtpValidated();
  }

}
