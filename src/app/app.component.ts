import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth-services/storage-service/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const BASIC_URL = ["http://localhost:8080/"];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'coding-discussion-ui';
  isUserLoggedIn: boolean=false;
  askedQuestion: string = '';
  constructor(private router: Router, private http: HttpClient){

  }
  ngOnInit(): void {

    this.updateUserLoggedInStatus();
    this.router.events.subscribe(event=>{
  
      if(event instanceof NavigationEnd){
        this.updateUserLoggedInStatus();
      }
    })
  }
  private updateUserLoggedInStatus():void{
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }

  postQuestionHttp(){
   return this.http.post<[]>(BASIC_URL + `api/askedQuestion/${5}`, this.askedQuestion,{
      headers:this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization","Bearer " +StorageService.getToken()
    )
  }

  postQuestion(){
    this.postQuestionHttp().subscribe(
      (res) => {
        console.log(res);
      }
    )
  }



}
