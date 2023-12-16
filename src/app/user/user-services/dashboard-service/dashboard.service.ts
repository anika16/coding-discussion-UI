import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { ConfigService } from 'src/app/config.service';
import { BACKEND_URL } from 'src/app/constants';

let BASIC_URL = "";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  askedQuestion: string = '';
  constructor(private http: HttpClient, private configService: ConfigService) {
    BASIC_URL = this.configService.baseUrl as string;
   }

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
