import { Injectable } from '@angular/core';

const TOKEN ='c_token';
const USER = 'c_user';
const OTP_USER = 'c_otp_user';
const IS_OTP_VALIDATED = 'isOtpValidated';
const IS_ADMIN = 'isAdmin';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static getUserId(): any {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user;
  }

  static getUser() {
    return JSON.parse(window.localStorage.getItem(USER) as string);
  }

  constructor() { }

  static hasToken(): boolean {
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

  static hasOtpUser(): boolean {
    if(this.getOtpUser() === null){
      return false;
    }
    return true;
  }

  static isOtpValidated(): string {
    return this.getOtpValidated();
  }

  static getIsAdmin(): string {
    return window.localStorage.getItem(IS_ADMIN) as string;
  }

  static getOtpValidated(): string {
    return window.localStorage.getItem(IS_OTP_VALIDATED) as string;
  }

  public saveOtpValidated() {
    window.localStorage.removeItem(IS_OTP_VALIDATED);
    window.localStorage.setItem(IS_OTP_VALIDATED,'true');
  }

  public saveUser(user:any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,user.userId);
    window.localStorage.removeItem(IS_ADMIN);
    window.localStorage.setItem(IS_ADMIN,user.isAdmin[0]);
  }

  public saveUserForOtp(email:any){
    window.localStorage.removeItem(OTP_USER);
    window.localStorage.setItem(OTP_USER,email);
  }

  static getOtpUser() {
    return window.localStorage.getItem(OTP_USER) as string;
  }

  static removeOtpUser() {
    window.localStorage.removeItem(OTP_USER);
  }

  static removeOtpValidated() {
    window.localStorage.removeItem(IS_OTP_VALIDATED);
  }

  public saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);

  }

  static getToken(){
    return localStorage.getItem(TOKEN);
  }

  static isUserLoggedIn(){
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(OTP_USER);
    window.localStorage.removeItem(IS_ADMIN);
    window.localStorage.removeItem(IS_OTP_VALIDATED);
    
  }
}
