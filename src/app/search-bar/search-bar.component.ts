import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { DashboardService } from '../user/user-services/dashboard-service/dashboard.service';
import { BACKEND_URL } from '../constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit{
  ngOnInit(): void {
  }  
  askedQuestion: string = '';
  constructor(private router: Router, private http: HttpClient, private service: DashboardService){
  }
}
