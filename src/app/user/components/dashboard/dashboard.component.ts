import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

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
  constructor(private service: QuestionService){

  }
  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions(){
    this.service.getAllQuestion(this.pageNum).subscribe((res)=>{
      if(this.paramValue == null){
        this.questions = res.questionDTOlist;
        this.questions.forEach(question => {
          question['isQuestionEditable'] = question.userId === StorageService.getUserId();
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
