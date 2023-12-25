import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { DashboardService } from '../../user-services/dashboard-service/dashboard.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  queryParams = new URLSearchParams(window.location.search);
  questions: any[]=[];
  pageNum:number=0;
  total!:number;
  paramName= 'search';
  paramValue = this.queryParams.get(this.paramName);
  isLoading: boolean = false;
  constructor(private service: QuestionService, private router: Router, private snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.getAllQuestions();
  }

  searchWithTag(tag: string){
    this.router.navigateByUrl("/user/askedQuestion?search=" + tag);
  }

  getAllQuestions(){
    this.isLoading = true;
    this.service.getAllQuestion(this.pageNum).subscribe((res: any)=>{
      this.isLoading = false;
      if(this.paramValue == null){
        this.questions = res.questionDTOlist;
        this.questions.forEach(question => {
          if(question.userId ==0){
            question.userName="Unkown User";
          }
          question['isQuestionEditable'] = (question.userId === StorageService.getUserId() || StorageService.getIsAdmin().toLowerCase() === 'true');
          question['isQuestionDeletable'] = StorageService.getIsAdmin().toLowerCase() === 'true';
        })
        this.total = res.totalPages * 5;
      }
    })
  }

  deleteQuestion(questionId: number){
    this.isLoading = true;
    this.service.deleteQuestion(questionId).subscribe((res) => {
      this.isLoading = false;
      this.snackBar.open(res,"Close",{duration:5000});
      window.location.reload();
    },
    (error) => {
      this.isLoading = false;
      this.snackBar.open("Something went wrong","Close",{duration:5000});
    })
  }

  pageIndexChange(event:any){
    this.pageNum = event.pageIndex;
    this.getAllQuestions();
  }
}
