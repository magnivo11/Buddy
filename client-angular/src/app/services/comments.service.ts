import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  private CommentUrl = environment.commentUrl;
  private filterUrl = environment.filterUrl;

  constructor(private http: HttpClient) {}
  
  filter(key: string): Observable<any> {
    const url = `${this.filterUrl}/comments/${key}`;
    return this.http.get<any>(url);
  }

  getComments(): Observable<any> {
    return this.http.get<any>(this.CommentUrl);
  }

  getCommentsByPostID(postId: String): Observable<any> {
    const url = `${this.CommentUrl}/bypost/${postId}`;
    return this.http.get<any>(url);
  }

  addComment(userID: String, postID: String, content: String): Observable<any> {
    return this.http.post<any>(this.CommentUrl, { userID: userID, postID: postID, content: content });
  }

  getComment(id: String): Observable<any> {
    const url = `${this.CommentUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateComment(comment: Comment): Observable<any> {
    return this.http.patch<any>(this.CommentUrl, { 
      content: comment.content, 
      id: comment._id 
    });
  }

  deleteComment(commentID: String, postID: String): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        commentID: commentID,
        postID: postID,
      },
    };
    return this.http.delete<any>(this.CommentUrl, options);
  }
}
