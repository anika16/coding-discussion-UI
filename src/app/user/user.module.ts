import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { DashboardSearchComponent } from './components/dashboard-search/dashboard-search.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { AskedByMeComponent } from './components/asked-by-me/asked-by-me.component';
import { UsersComponent } from './components/users/users.component';
import { TextEditorComponent } from './components/view-question/text-editor/text-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { UpvoteComponent } from './components/view-question/upvote/upvote.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostQuestionComponent,
    ViewQuestionComponent,
    DashboardSearchComponent,
    EditQuestionComponent,
    AskedByMeComponent,
    UsersComponent,
    TextEditorComponent,
    UpvoteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    NgxEditorModule
  ]
})
export class UserModule { }
