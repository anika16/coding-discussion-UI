import { Component, OnInit, inject } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent implements OnInit{

  tags: any = [];
  isLoading: boolean = false;
  addOnBlur =  true;
  validateForm!: FormGroup;

  seperatorKeysCodes = [ENTER, COMMA] as const;
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



  constructor(private service: QuestionService , 
    private fb: FormBuilder,
    private router: Router,
    private snackBar:MatSnackBar){


  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }

  postQuestion(){
    this.isLoading = true;
    this.service.postQuestion(this.validateForm.value).subscribe((res)=>{
      if(res.id!=null){
        this.isLoading = false;
        this.snackBar.open("Question posted succesfully","Close",{duration:5000});
        this.router.navigateByUrl('/user/dashboard');
      }
      else{
        this.isLoading = false;
        this.snackBar.open("Something went wrong","Close",{duration:5000});
        this.router.navigateByUrl('/user/dashboard');
      }
    });
  }
}