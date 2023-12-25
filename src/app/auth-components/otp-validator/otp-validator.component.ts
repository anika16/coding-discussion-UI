import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-otp-validator',
  templateUrl: './otp-validator.component.html',
  styleUrls: ['./otp-validator.component.scss']
})

export class OtpValidatorComponent {
  display: any;
  isValidOPT:boolean=true;
  otpForm!:FormGroup;
  isLoading: boolean = false;
  constructor(
    private service: AuthService, 
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private snackBar:MatSnackBar){
      this.timer(5);
      

  }
  ngOnInit(): void {
    this.otpForm = this.fb.group({
     email:[StorageService.getOtpUser(), Validators.required],
     otp: ['', Validators.required]
    })
   }

   
  submitOtp(){
    this.isLoading = true;
    this.service.submitOtp(
      this.otpForm.get(['email'])!.value,
      this.otpForm.get(['otp'])!.value
    ).subscribe(
      (response)=>{
        this.isLoading = false;
        this.snackBar.open("OTP validation Successful", 'Close', {duration: 5000})
        this.router.navigateByUrl("reset-password");
    },
      error=>{
        this.isLoading = false;
        if(error.error){
          this.snackBar.open(error.error, 'Close', {duration: 5000})
        }else{
          this.snackBar.open("Something went wrong, Please try again later.", 'Close', {duration: 5000})
        }
        StorageService.removeOtpUser();
      }
    )
    this.storageService.saveOtpValidated();
  }


  timer(minute: number) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;
    const prefix = minute < 10 ? "0" : "";
    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
        this.otpForm.disable();
      }
      
    }, 1000);
  }
}
