import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { ConfigService } from 'src/app/config.service';
import { BACKEND_URL } from 'src/app/constants';

let BASIC_URL = "";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient, private configService: ConfigService) { 
    BASIC_URL = this.configService.baseUrl as string;
  }

  postAnswer(answerDTO: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + "api/answer", answerDTO,{
      headers:this.createAuthorizationHeader()
    });
  }

  submitVote(userId: number, answerId: number, isUpvoting: boolean): Observable<any> {
    return this.http.patch(BASIC_URL+`api/answer/submit-upvote/${userId}/${answerId}/${isUpvoting}`,{},{
      headers:this.createAuthorizationHeader(),
      responseType: 'text'
    }) 
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer " +StorageService.getToken()
    )
  }

  postAnswerImage(file: any, amswerId: number): Observable<any> {
    return this.http.post<[]>(BASIC_URL + `api/image/${amswerId}`, file,{
      headers:this.createAuthorizationHeader()
    });
  }

}
