import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token = '';
  public isLogin = new BehaviorSubject(false);
  public showLoginComponent = new BehaviorSubject(false);
  public loginUserDetails = new Subject<User>();
  private connectedUser: User;
  private usersUrl = environment.usersUrl;
  error;

  constructor(private http: HttpClient) { }
  onLogin(data) {
    const url = `${this.usersUrl}/adminLogin`;
    return this.http.post(url, data);
  }
  onUpdate(data) {
    const url = `${this.usersUrl}/updateAdmin`;
    return this.http.put(url, data);
  }
  setIsLogin(isLoggedIn , userDetails) {
    this.connectedUser = userDetails;
    this.isLogin.next(isLoggedIn);
    if (isLoggedIn === false) {
      // localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.loginUserDetails.next(userDetails);
  }
  getConnectedUser() {
    return this.connectedUser;
  }

  showLogin(data: boolean) {
      this.showLoginComponent.next(data);
  }
  setShowLoginComp(data: boolean){
    this.showLoginComponent.next(data);
  }
}
