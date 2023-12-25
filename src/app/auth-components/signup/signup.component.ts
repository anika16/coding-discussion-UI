import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  isLoading: boolean = false;
  signupForm!: FormGroup;
  roles = [
    {value :'Developer',viewValue: 'Developer'},
    {value:'DevOps',viewValue: 'DevOps'},
    {value:'QA', viewValue: 'QA'}]
 
  constructor(
    private service: AuthService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private  router: Router
  ){}

  ngOnInit(){
    const validators = [Validators.email, Validators.required];
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', validators],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
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
  signup(){
    this.isLoading = true;
    this.service.signup(this.signupForm.value).subscribe((response: any)=>{
      if(response.id !== null){
        this.isLoading = false;
        this.snackbar.open(
          "You are registered successfully",
          'Close',
          {duration: 5000}
        );
        this.router.navigateByUrl('/login');
      }
      else{
        this.isLoading = false;
        this.snackbar.open(response.message, 'Close', {duration: 5000})
      }
    },(error:any)=>{
      this.isLoading = false;
      if(error.error){
        this.snackbar.open(error.error, 'Close', {duration: 5000})
      }else{
        this.snackbar.open("Registration Failed, Please Try Again Later", 'Close', {duration: 5000})
      }
    })
  }
}
