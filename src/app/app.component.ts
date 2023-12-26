import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from './auth-services/storage-service/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from './constants';
import { ConfigService } from './config.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ManageUserService } from './user/user-services/manage-user-service/manage-user.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //faUser = 
  title = 'coding-discussion-ui';
  isUserLoggedIn: boolean=false;
  askedQuestion: string = '';
  user: any;
  constructor(private router: Router, 
    private userService: ManageUserService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar){

  }
  ngOnInit(): void {

    this.updateUserLoggedInStatus();
    this.router.events.subscribe((event: any)=>{
  
      if(event instanceof NavigationEnd){
        this.updateUserLoggedInStatus();
      }
    })
    if(this.isUserLoggedIn){
      this.userService.getUser(+StorageService.getUser()).subscribe((res: any) => {
        this.user = res;
      })
    }
  }
  private updateUserLoggedInStatus():void{
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }

  popUpForChangeUserName(): void {
    const dialogRef = this.dialog.open(ChangeUsernameComponent, {
      data: {currentUserName: this.user.name, newUserName: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user.name = result.newUserName;
      this.userService.changeUserName(this.user.id,this.user.name).subscribe(
        (res: any) => {
          this.snackBar.open("Username changed successfully","Close",{duration:5000});
        },
        error => {
          this.snackBar.open(error.error,"Close",{duration:5000});
        }
      )
    });
  }

  popUpForChangePassword(): void{
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: {oldPassword: '', newPassword: '', confirmPassword: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      let changePasswordDTO = result;
      changePasswordDTO.email = this.user.email;
      this.userService.changePassword(changePasswordDTO).subscribe(
          (res: any) => {
            this.snackBar.open(res,"Close",{duration:5000});
          },
          error => {
            this.snackBar.open(error.error,"Close",{duration:5000});
          }
        )
    });
  }

  isVisible(){
    if(StorageService.getIsAdmin().toLowerCase() === 'true'){
      return true;
    }
    return false;
  }

}
