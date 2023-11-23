import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { DashboardService } from '../../user-services/dashboard-service/dashboard.service';
import { Router } from '@angular/router';

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
  constructor(private service: QuestionService, private router: Router){

  }
  ngOnInit(): void {
    this.getAllQuestions();
  }

  searchWithTag(tag: string){
    this.router.navigateByUrl("/user/askedQuestion?search=" + tag);
  }

  getAllQuestions(){
    this.service.getAllQuestion(this.pageNum).subscribe((res)=>{
      if(this.paramValue == null){
        this.questions = res.questionDTOlist;
        this.questions.forEach(question => {
          if(question.userId ==0){
            question.userName="Unkown User";
          }
          question['isQuestionEditable'] = (question.userId === StorageService.getUserId() || StorageService.getIsAdmin().toLowerCase() === 'true');
        })
        this.total = res.totalPages * 5;
      }
    })
  }

  pageIndexChange(event:any){
    this.pageNum = event.pageIndex;
    this.getAllQuestions();
  }
}
