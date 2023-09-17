import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { StorageService } from '../auth-services/storage-service/storage.service';

const BASIC_URL = ['']
export const AUTH_HEADER = "authorization"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,
    private storage: StorageService) { }

  signup(signupRequest :any):Observable<any>{
    return this.http.post(BASIC_URL+"sign-up",signupRequest)

  }
  login(email:string,password:string):Observable<any>{
    return this.http.post(BASIC_URL+"authenticate", {
      email,
      password
    },
    {observe: 'response'}).pipe(
      tap(__ => this.log("User Authentication")),
      map((res: HttpResponse<any>) =>{
        this.storage.saveUser(res.body);
        const tokenLength = res.headers.get(AUTH_HEADER)?.length;
        const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7,tokenLength) as string;
        this.storage.saveToken(bearerToken);
        return res;
      })
    );
    
  }

  log(message:string):void{
    console.log("User Auth service" + message);
  }
}
