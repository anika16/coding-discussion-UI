import { Component, OnInit, SecurityContext } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  renderedHtmlContent!: SafeHtml;
  isLoading: boolean = false;

  constructor(
    private questionService: QuestionService, 
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private answerService: AnswerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer
    ){}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      body: [null, Validators.required]
    })
    this.getQuestionById();
  }

  getQuestionById(){
    this.isLoading = true;
    this.questionService.getQuestionById(this.questionId).subscribe((res: any) => {
      this.isLoading = false;
      this.question = res.questionDTO;
      res.answerDTOList.forEach((element: any) => {
        if(element.file != null){
          element.convertedImg = 'data:image/jpeg;base64,' + element.file.data;
        }
        if(element.body != null){
          let form = new FormGroup({
            editorContent: new FormControl(element.body)
          });
        
          element.renderedHtmlContent = this.sanitizeHtmlContent(form.get("editorContent")?.value);
          console.log(this.renderedHtmlContent);
        }
        this.answers.push(element); 
        
      });
    })
  }

  public sanitizeHtmlContent(htmlstring: any): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, htmlstring) as SafeHtml;
  }

  // addAnswer(){
  //   const data = this.validateForm.value;
  //   data.questionId = this.questionId;
  //   data.userId = StorageService.getUserId();
  //   this.formData.append("multipartFile", this.selectedFile);
  //   this.answerService.postAnswer(data).subscribe((res) => {
  //   this.answerService.postAnswerImage(this.formData, res.id).subscribe(
  //     (res) => {
  //     }
  //   );

  //     if(res.id != null){
  //       this.snackBar.open("Answer posted successfully", "Close", {duration:5000});
  //       this.router.navigateByUrl('/user/dashboard');
  //     }
  //     else{
  //       this.snackBar.open("Something went wrong", "Close", {duration:5000});
  //     }
  //   })
  // }

  // onFileSelected(event: any){
  //   this.selectedFile = event.target.files[0];
  //   this.previewImage();
  // }

  // previewImage(){
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(this.selectedFile);
  // }

}
