import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-validator',
  templateUrl: './otp-validator.component.html',
  styleUrls: ['./otp-validator.component.scss']
})

export class OtpValidatorComponent {
  display: any;
  isValidOPT:boolean=true;
  loginForm!:FormGroup;
  constructor( 
    private fb: FormBuilder,
    private snackBar:MatSnackBar){
      this.timer(1);
      

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
     email:['', Validators.required],
    })
   }

   
  submitOpt(){

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
        console.log("finished");
        clearInterval(timer);
        this.loginForm.disable();
      }
      
    }, 1000);
  }
}
