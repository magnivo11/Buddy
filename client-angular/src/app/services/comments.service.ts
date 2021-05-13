import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  private CommentsUrl = environment.commentsUrl;
  private filterUrl = environment.filtersUrl;

  constructor(private http: HttpClient) {}
  
  filter(key: string): Observable<any> {
    const url = `${this.filterUrl}/comments/${key}`;
    return this.http.get<any>(url);
  }

  getComments(): Observable<any> {
    return this.http.get<any>(this.CommentsUrl);
  }

  getCommentsByPostID(postId: String): Observable<any> {
    const url = `${this.CommentsUrl}/${postId}`;
    return this.http.get<any>(url);
  }

  addComment(name: String, postId: String, body: String): Observable<any> {
    return this.http.post<any>(this.CommentsUrl, { name: name, postId: postId, body: body });
  }

  getComment(id: String): Observable<any> {
    const url = `${this.CommentsUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  updateComment(comment: Comment): Observable<any> {
    const url = `${this.CommentsUrl}/id/${comment._id}`;
    return this.http.patch<any>(url, { content: comment.content, date: comment.date, postID: comment.postID, userID: comment.userID });
  }

  deleteComment(id: String): Observable<any> {
    const url = `${this.CommentsUrl}/id/${id}`;
    return this.http.delete<any>(url);
  }
}
