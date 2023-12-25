import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeUsernameComponent } from '../change-username/change-username.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {oldPassword: string, newPassword: string, confirmPassword: string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  isValidInput(): boolean {
    if(this.data.oldPassword.length > 0 && 
      this.data.newPassword.length > 0 && 
      this.data.confirmPassword.length > 0 &&
      this.data.newPassword === this.data.confirmPassword ){
        return true;
      }

    return false;
  }
}
