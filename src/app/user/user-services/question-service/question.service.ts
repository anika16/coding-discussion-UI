import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { ConfigService } from 'src/app/config.service';
import { BACKEND_URL } from 'src/app/constants';

let BASIC_URL = "";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  editQuestion(questionDTO: any, questionId: number) {
    questionDTO.userId = StorageService.getUserId();
    return this.http.put<[]>(BASIC_URL + `api/edit/question/${questionId}`, questionDTO,{
      headers:this.createAuthorizationHeader()
    });
  }

  constructor(private http: HttpClient, private configService: ConfigService) {
    BASIC_URL = this.configService.baseUrl as string;
   }

  postQuestion(questionDTO: any): Observable<any> {
    questionDTO.userId = StorageService.getUserId();
    return this.http.post<[]>(BASIC_URL + "api/question", questionDTO,{
      headers:this.createAuthorizationHeader()
    });
  }

  getAllQuestion(pageNumber:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/questions/${pageNumber}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  getQuestionById(questionId:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/question/${questionId}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  getAllQuestionsAskedByMe():Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.get<[]>(BASIC_URL+`api/questionPosted/${userId}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer " +StorageService.getToken()
    )
  }
}
