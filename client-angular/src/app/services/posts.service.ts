import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = environment.postUrl;

  constructor(private http: HttpClient) { }
  
  filter(key: string): Observable<any> {
    const url = `${this.postsUrl}/filter/${key}`;
    return this.http.get<any>(url);
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl);
  }

  getNumOfPosts(): Observable<Number> {
    const url = `${this.postsUrl}/count`;
    return this.http.get<Number>(url);
  }

  getPostsByUser(userID: String): Observable<any> {
    const url = `${this.postsUrl}/user/${userID}`;
    return this.http.get<any>(url);
  }

  addPost(content: String, status: String, userID: String): Observable<any> {
    return this.http.post<any>(this.postsUrl, { 
      content: content, 
      status: status, 
      userID: userID, 
    });
  }

  getPost(id: String): Observable<any> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put<any>(this.postsUrl, { 
      postID: post._id, 
      userID: post.userID,
      content: post.content, 
      status: post.status
    });
  }

  deletePost(postID: String, userID: String): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        postID: postID,
        userID: userID,
      },
    };
    return this.http.delete<any>(this.postsUrl, options);
  }
}