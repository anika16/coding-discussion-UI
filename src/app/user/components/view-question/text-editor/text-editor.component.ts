import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { jsonDoc } from '../doc';
import { AnswerService } from 'src/app/user/user-services/answer-services/answer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit,OnDestroy {

  constructor(
    private fb: FormBuilder,
    private answerService: AnswerService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  @Input()
  questionId!: number;
  
  editordoc = jsonDoc;
  validateForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  formData: FormData = new FormData();
  answers: any[] = [];
  data = {} as any;
  htmlContent = "";

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
   // ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // form = new FormGroup({
  //   editorContent: new FormControl(
  //     { value: jsonDoc, disabled: false },
  //     Validators.required()
  //   ),
  // });

  get doc(): AbstractControl {
    console.log(this.validateForm.get('body'))
    return this.validateForm.get('body') as AbstractControl;
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.validateForm = this.fb.group({
      body: [jsonDoc, Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  addAnswer(){
    this.data.questionId = this.questionId;
    this.data.userId = StorageService.getUserId();
    console.log(this.validateForm.value);
    console.log(this.validateForm.value.type);
    this.data.body =  this.htmlContent;
    console.log(this.data);
    this.formData.append("multipartFile", this.selectedFile);
    this.answerService.postAnswer(this.data).subscribe((res) => {
    this.answerService.postAnswerImage(this.formData, res.id).subscribe(
      (res) => {
      }
    );

      if(res.id != null){
        this.snackBar.open("Answer posted successfully", "Close", {duration:5000});
        window.location.reload();
      }
      else{
        this.snackBar.open("Something went wrong", "Close", {duration:5000});
      }
    })
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

}
