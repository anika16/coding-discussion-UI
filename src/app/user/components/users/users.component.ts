import { Component, OnInit } from "@angular/core";
import { ManageUserService } from "../../user-services/manage-user-service/manage-user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder } from "@angular/forms";

interface User {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  locked: boolean;
}
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;

  constructor(
    private service: ManageUserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  makeAdmin(userId: number): void {
    this.isLoading = true;
    this.service.makeAdmin(userId).subscribe(
      (res) => {
        this.isLoading = false;
        this.snackBar.open(`User made as Admin successfully.`, "Close", {
          duration: 5000,
        });
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open(
          "Something went wrong, Please try again later.",
          "Close",
          { duration: 5000 }
        );
        console.error("Error changing user access:", error);
      }
    );
  }
  setAdminEnabled(user: User): boolean {
    return !user.admin;
  }
  toggleAdminEnabled(user: User): void {
    user.admin = !user.admin;
    user.locked = false;
  }
  setLockedEnabled(user: User): boolean {
    return !user.locked;
  }
  toggleUserLock(user: User): void {
    user.locked = !user.locked;
  }
  getAllUsers() {
    this.isLoading = true;
    this.service.getAllUsers().subscribe(
      (res) => {
        this.isLoading = false;
        this.users = res;
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open("Something went wrong", "Close", {
          duration: 5000,
          panelClass: "error-snackbar",
        });
      }
    );
  }

  toggleUserAccess(userId: number): void {
    this.isLoading = true;
    this.service.toggleUserAccess(userId).subscribe(
      (res) => {
        this.isLoading = false;
        this.snackBar.open(
          `User's access is now changed successfully.`,
          "Close",
          { duration: 5000 }
        );
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open(
          "Something went wrong, Please try again later.",
          "Close",
          { duration: 5000 }
        );
        console.error("Error changing user access:");
      }
    );
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
}
