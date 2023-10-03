import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { QuestionService } from '../../user-services/question-service/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent {

  tags: any = [];
  isSubmitting: boolean = false;
  addOnBlur =  true;
  validateForm!: FormGroup;
  question: any;
  questionId: number = this.activatedRoute.snapshot.params["questionId"];
  seperatorKeysCodes = [ENTER, COMMA] as const;
  answers: any[] = [];
  announcer = inject(LiveAnnouncer)

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if(value){
      this.tags.push({ name : value});
    }
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce (`Removed ${tag}`);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) { 
      const value = event.value.trim();
      if (!value) {
        this.remove(tag); 
        return;
      }
      const index = this.tags.indexOf(tag);
      if(index >= 0){
        this.tags[index].name = value;
      }
  }



  constructor(private service: QuestionService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.getQuestionById();
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    }) 
  }

  editQuestion(){
    console.log(this.validateForm.value);
    this.service.editQuestion(this.validateForm.value,this.questionId).subscribe((res: any)=>{
      console.log(res);
      if(res.id!=null){
        this.snackBar.open("Question updated succesfully","Close",{duration:5000});
      }
      else{
        this.snackBar.open("Something went wrong","Close",{duration:5000});
      }
    });
    this.router.navigateByUrl('/user/dashboard');

  }

  getQuestionById(){
    this.service.getQuestionById(this.questionId).subscribe((res) => {
      console.log(res);
      this.question = res.questionDTO;
      this.validateForm =this.fb.group({
        title: [this.question.title, Validators.required],
        body: [this.question.body, Validators.required]
      })
    })
  }

}
