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
    
    filter(key: String): Observable<any> {
      const url = `${this.usersUrl}/filter/${key}`;
      return this.http.get<any>(url);
    }
  
    getUsers(): Observable<any> {
      return this.http.get<any>(this.usersUrl);
    }
  
    addUser(firstName: String, lastName: String, email: String, password: String, description: String, isAdmin: boolean): Observable<any> {
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
  
    getUser(id: String): Observable<any> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.get<any>(url);
    }
  
    updateUser(user: User): Observable<any> {
      const url = `${this.usersUrl}/byadmin`;

      return this.http.patch<any>(url, { 
        id:user._id,
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        isAdmin: user.isAdmin,
        description: user.description
      });
    }
  
    deleteUser(id: String): Observable<any> {
      const url = `${this.usersUrl}/${id}`;
      return this.http.delete<any>(url);
    }
}
