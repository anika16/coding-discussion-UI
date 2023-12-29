import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { error } from "console";
import { StorageService } from "src/app/auth-services/storage-service/storage.service";
import { AnswerService } from "src/app/user/user-services/answer-services/answer.service";
import { ManageUserService } from "src/app/user/user-services/manage-user-service/manage-user.service";
import { UserModule } from "src/app/user/user.module";

@Component({
  selector: "app-upvote",
  templateUrl: "./upvote.component.html",
  styleUrls: ["./upvote.component.scss"],
})
export class UpvoteComponent implements OnInit {
  @Input() answer!: any;
  userId!: number;
  answerUpvotes = 0;
  clicked = false;
  isUpvoting = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private answeService: AnswerService
  ) {}

  ngOnInit(): void {
    this.answerUpvotes = this.answer.votes;
  }

  upvoteAnswer(): void {
    if (!this.toggleLikeButton()) {
      this.answerUpvotes++;
      this.clicked = true;
      this.isUpvoting = true;
      this.answeService
        .submitVote(StorageService.getUserId(), this.answer.id, this.isUpvoting)
        .subscribe(
          (res: any) => {
            this.snackBar.open("You upvoted the answer", "Close", {
              duration: 5000,
            });
          },
          (error: any) => {
            this.clicked = false;
            this.snackBar.open(error.error, "Close", { duration: 5000 });
          }
        );
    }else{
      this.answerUpvotes--;
      this.clicked = false;
      this.isUpvoting = false;
      this.answeService
        .submitVote(StorageService.getUserId(), this.answer.id, this.isUpvoting)
        .subscribe(
          (res: any) => {
            this.snackBar.open("You removed upvote for the answer", "Close", {
              duration: 5000,
            });
          },
          (error: any) => {
            this.clicked = false;
            this.snackBar.open(error.error, "Close", { duration: 5000 });
          }
        );
    }
  }

  toggleLikeButton() {
    return (
      this.answer.votedUsers.includes(StorageService.getUserId()) ||
      this.clicked
    );
  }
}
