import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = environment.postsUrl;
  private filterUrl = environment.filtersUrl;

  constructor(private http: HttpClient) { }
  
  filter(key: string): Observable<any> {
    const url = `${this.filterUrl}/posts/${key}`;
    return this.http.get<any>(url);
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl);
  }

  getNumOfPosts(): Observable<Number> {
    const url = `${this.postsUrl}/posts/count`;
    return this.http.get<Number>(url);
  }

  getPostsByCategory(category: String): Observable<any> {
    const url = `${this.postsUrl}/${category}`;
    return this.http.get<any>(url);
  }

  addPost(title: String, subTitle: String, img: String, category: String, body: String): Observable<any> {
    return this.http.post<any>(this.postsUrl, { 
      title: title, 
      subTitle: subTitle, 
      category: category, 
      img: img, 
      body: body });

  }

  getPost(id: String): Observable<any> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updatePost(post: Post): Observable<any> {
    const url = `${this.postsUrl}/id/${post._id}`;
    return this.http.patch<any>(url, { 
      title: post.title, 
      subTitle: post.subTitle, 
      category: post.category, 
      img: post.img, 
      body: post.body });
  }

  deletePost(id: String): Observable<any> {
    const url = `${this.postsUrl}/id/${id}`;
    return this.http.delete<any>(url);
  }
}