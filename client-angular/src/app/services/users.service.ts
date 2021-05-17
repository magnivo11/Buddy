import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
    private usersUrl = environment.usersUrl;
  
    constructor(private http: HttpClient) { }
    
    filter(key: string): Observable<any> {
      const url = `${this.usersUrl}/filter/${key}`;
      return this.http.get<any>(url);
    }
  
    getUsers(): Observable<any> {
      return this.http.get<any>(this.usersUrl);
    }
  
    addUser(firstName: string, lastName: string, email: string, password: string, description: string, isAdmin: boolean): Observable<any> {
      var code = "notadmin";
      if(isAdmin === true){
        code = "admincode"
      }
      return this.http.post<any>(this.usersUrl+'/register', { 
        email: email, 
        firstName: firstName, 
        lastName: lastName, 
        password: password, 
        description: description,
        code: code
      });
    }
  
    getUser(id: string): Observable<any> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get<any>(url);
    }
  
    updateUser(user: User): Observable<any> {
      var code = "notadmin";
      if(user.isAdmin === true){
        code = "admincode"
      }
      return this.http.patch<any>(this.usersUrl, { 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        password: user.password, 
        description: user.description,
        code: code
      });
    }
  
    deleteUser(id: string): Observable<any> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.delete<any>(this.usersUrl);
    }
}
