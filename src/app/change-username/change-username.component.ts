import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent {

  constructor(
    public dialogRef: MatDialogRef<ChangeUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {currentUserName: string, newUserName: string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
