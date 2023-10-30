import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth-services/storage-service/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from './constants';


const BASIC_URL = BACKEND_URL;
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

}
