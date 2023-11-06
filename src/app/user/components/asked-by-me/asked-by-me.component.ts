import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-asked-by-me',
  templateUrl: './asked-by-me.component.html',
  styleUrls: ['./asked-by-me.component.scss']
})
export class AskedByMeComponent {
  
  queryParams = new URLSearchParams(window.location.search);
  questions: any[]=[];
  pageNum:number=0;
  total!:number;
  paramName= 'search';
  paramValue = this.queryParams.get(this.paramName);
  constructor(private service: QuestionService){

  }
  ngOnInit(): void {
    this.getAllQuestionsAskedByMe();
}

getAllQuestionsAskedByMe(){
  this.service.getAllQuestionsAskedByMe().subscribe((res)=>{
    this.questions = res.questionDTOlist;
  })
}
}
