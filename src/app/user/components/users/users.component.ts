import { Component, OnInit } from '@angular/core';
import { ManageUserService } from '../../user-services/manage-user-service/manage-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  admin:boolean;
  locked:boolean;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  users: User[] = [];

  constructor(private service: ManageUserService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

    makeAdmin(userId: number): void {
    this.service.makeAdmin(userId).subscribe(
      (res) => {
        console.log(`User with userId ${userId} made as Admin successfully.`);
      },
      (error) => {
        console.error('Error changing user access:', error);
      }
    );
  }
  setAdminEnabled(user: User): boolean {
    return !user.admin;
  }
  toggleAdminEnabled(user: User): void {
    user.admin = !user.admin;
  }
  setLockedEnabled(user: User): boolean {
    return !user.locked;
  }
  toggleUserLock(user: User): void {
    user.locked = !user.locked;
  }
  getAllUsers(){
      this.service.getAllUsers().subscribe((res)=>{
          this.users = res;
        })
      }
    
    toggleUserAccess(userId: number): void {
    this.service.toggleUserAccess(userId).subscribe(
      (res) => {
        console.log(`User with userId ${userId}'s access is now changed successfully.`);
      },
      (error) => {
        console.error('Error changing user access:', error);
      }
    );
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

}



