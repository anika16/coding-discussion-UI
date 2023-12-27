import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { UserModule } from 'src/app/user/user.module';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})
export class UpvoteComponent {
  @Input() answerId!: number;
  userId!: number;
  answerUpvotes = 0;
  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {}

  upvoteAnswer(): void {
    this.http.patch(`/api/answer/submit-upvote/${this.userId}/${this.answerId}`, {})
      .subscribe(
        data => {
          const response = data as { votes: number };
          this.answerUpvotes = response.votes;
        },
        error => {
        this.snackBar.open("Failed to upvote answer", "Close", {duration:5000});
      }
        
      );
  }
}
