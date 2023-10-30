import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { BACKEND_URL } from 'src/app/constants';

const BASIC_URL = BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  askedQuestion: string = '';
  constructor(private http: HttpClient) { }

  postQuestionHttp(askedQuestion: string){
    return this.http.post<[]>(BASIC_URL + `api/askedQuestion`,askedQuestion,{
       headers:this.createAuthorizationHeader()
     })
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer " +StorageService.getToken()
    )
  }
}
