import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  questionId: number = this.activatedRoute.snapshot.params["questionId"];
  question: any;
  validateForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  formData: FormData = new FormData();
  answers: any[] = [];


  constructor(
    private questionService: QuestionService, 
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private answerService: AnswerService,
    private snackBar: MatSnackBar
    ){}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      body: [null, Validators.required]
    })
    this.getQuestionById();
  }

  getQuestionById(){
    this.questionService.getQuestionById(this.questionId).subscribe((res) => {
      this.question = res.questionDTO;
      res.answerDTOList.forEach((element: any) => {
        if(element.file != null){
          element.convertedImg = 'data:image/jpeg;base64,' + element.file.data;
        }
        this.answers.push(element); 
        
      });
    })
  }

  addAnswer(){
    const data = this.validateForm.value;
    data.questionId = this.questionId;
    data.userId = StorageService.getUserId();
    this.formData.append("multipartFile", this.selectedFile);
    this.answerService.postAnswer(data).subscribe((res) => {
    this.answerService.postAnswerImage(this.formData, res.id).subscribe(
      (res) => {
      }
    );

      if(res.id != null){
        this.snackBar.open("Answer posted successfully", "Close", {duration:5000});
      }
      else{
        this.snackBar.open("Something went wrong", "Close", {duration:5000});
      }
    })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
