import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersUrl = environment.userUrl;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: String): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  getUserByEmail(email: String): Observable<User> {
    const url = `${this.usersUrl}/byemail/${email}`;
    console.log(this.http.get<User>(url));
    return this.http.get<User>(url)
  }

  getUsersGroupedByAdmin(): Observable<String[]> {
    const url = this.usersUrl+`/groupedbyadmin`;
    return this.http.get<String[]>(url);
  }

  register(body:any) : Observable<User>
  {
    var res = JSON.parse(body);
    return this.http.post<User>(this.usersUrl+'/register' , {email:res.email,name:res.name,lastName:res.lastName,code:res.secretkey,password:res.password});
  }

  login(body:any){
    return this.http.post(this.usersUrl+'/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  home(){
    return this.http.get(this.usersUrl+"/home",{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
     return this.http.get(this.usersUrl+'/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
 
}