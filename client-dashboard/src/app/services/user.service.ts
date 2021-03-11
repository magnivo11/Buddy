import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = environment.usersUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: String): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

/*
  addArticle(title: string): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, { title: title });
  }

  updateArticle(article: Article): Observable<Article> {
    const url = `${this.articlesUrl}/${article._id}`;
    return this.http.patch<Article>(url, { title: article.title });
  }

  deleteArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.delete<Article>(url);
  }

  scrape(): Observable<any> {
    const url = `${this.articlesUrl}/scrape`;
    return this.http.get(url);
  }*/
}