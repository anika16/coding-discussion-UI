import { Component } from '@angular/core';
import { DashboardService } from '../../user-services/dashboard-service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: ['./dashboard-search.component.scss']
})
export class DashboardSearchComponent {

  queryParams = new URLSearchParams(window.location.search);
  questions: any[] = [];
  pageNum: number = 0;
  total!: number;
  paramName = 'search';
  paramValue = '';
  isLoading: boolean = false;

  constructor(private service: DashboardService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((queryParams) => {
      const paramValue = queryParams["search"];
      this.postQuestion(paramValue);
    });
  }

  postQuestion(question: string) {
    if (question.length > 0) {
      this.isLoading = true;
      this.service.postQuestionHttp(question).subscribe(
        (res: any) => {
          this.isLoading = false;
          this.questions = res.questionDTOlist;
        },
        (error: any) => {
          this.isLoading = false;
          console.error("Error fetching questions:", error);
        }
      );
    } else {
      this.router.navigateByUrl("/user/dashboard");
    }
  }
}
