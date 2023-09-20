import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent {

  tags!: [];

  readonly seperatedKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer)

  add(event: MatChipEditedEvent) {
    const value = {event.value || ''}.trim();
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
        this.remove(tag); return;
      }
      this.tags[index].name = value;
  }

  constructor(private service: QuestionService){}

  
}
