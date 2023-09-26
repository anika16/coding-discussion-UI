import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  questions: any[]=[];
  pageNum:number=0;
  total!:number;

  constructor(private service: QuestionService){

  }
  ngOnInit(): void {
      this.getAllQuestions();
  }

  getAllQuestions(){
    this.service.getAllQuestion(this.pageNum).subscribe((res)=>{
      console.log(res);
      this.questions = res.questionDTOlist;
      this.total = res.totalPages * 5;
      
    })
  }

  pageIndexChange(event:any){
    this.pageNum = event.pageIndex;
    this.getAllQuestions();

  }
}
