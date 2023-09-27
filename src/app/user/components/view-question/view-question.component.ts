import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { AnswerService } from '../../user-services/answer-services/answer.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  questionId: number = this.activatedRoute.snapshot.params["questionId"];
  question: any;
  validateForm!: FormGroup;

  constructor(
    private questionService: QuestionService, 
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private answerService: AnswerService){}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      body: [null, Validators.required]
    })
    this.getQuestionById();
  }

  getQuestionById(){
    this.questionService.getQuestionById(this.questionId).subscribe((res) => {
      console.log(res);
      this.question = res.questionDTO;
    })
  }

  addAnswer(){
    console.log(this.validateForm.value);
    const data = this.validateForm.value;
    data.questionId = this.questionId;
    data.userId = StorageService.getUserId();
    this.answerService.postAnswer(data).subscribe((res) => {
      console.log(res);
    })
  }

}
