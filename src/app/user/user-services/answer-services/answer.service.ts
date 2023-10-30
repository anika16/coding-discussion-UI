import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { BACKEND_URL } from 'src/app/constants';

const BASIC_URL = BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  postAnswer(answerDTO: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + "api/answer", answerDTO,{
      headers:this.createAuthorizationHeader()
    });
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
