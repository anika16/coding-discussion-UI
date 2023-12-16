import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { ConfigService } from 'src/app/config.service';
import { BACKEND_URL } from 'src/app/constants';

let BASIC_URL = "";
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient, private configService: ConfigService) {
    BASIC_URL = this.configService.baseUrl as string;
   }

  
  getAllUsers():Observable<any>{
    return this.http.get<[]>(BASIC_URL+`api/users`,{
      headers:this.createAuthorizationHeader()
    });
  }
  makeAdmin(userId: number) {
    const url = BASIC_URL + `api/user/${userId}/make-admin`;
    return this.http.post(url, {}, { headers: this.createAuthorizationHeader() });
  }
  toggleUserAccess(userId: number): Observable<any> {
    const url = BASIC_URL+`api/user/${userId}/toggle-access`;
    return this.http.post(url,{},
      {headers:this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer " +StorageService.getToken()
    )
  }
}
