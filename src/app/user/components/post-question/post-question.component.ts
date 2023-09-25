import { Component, OnInit, inject } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent implements OnInit{

  tags: any = [];
  isSubmitting: boolean = false;
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



  constructor(private service: QuestionService , private fb: FormBuilder){ }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }

  postQuestion(){
    console.log(this.validateForm.value);
    

  }
  

  
}