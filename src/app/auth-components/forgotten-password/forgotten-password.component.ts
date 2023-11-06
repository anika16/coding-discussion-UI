import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.auth-service/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  loginForm!:FormGroup;

  constructor( 
    private fb: FormBuilder,
    private snackBar:MatSnackBar){
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
     email:['', Validators.required],
    })
   }

  submitEmail(){

  }

}
