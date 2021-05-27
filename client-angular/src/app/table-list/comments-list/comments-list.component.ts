import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  comments :  Comment[] = [];  
  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private commentsService :  CommentsService, private router: Router){}
  
  ngOnInit() {
    if(this.listFor === '')
      this.loadAll();
    else if (this.listFor !== '')
    {
      this.loadForPost(this.listFor);
    }
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true")
      this.loadAll();
    if(this.listFor === "" || this.search === "")
    { 
      this.loadAll();
    }
    else if(this.listFor === "search")
    { 
      this.commentsService.filter(this.search).subscribe(data =>{ 
        this.comments = data;
      }, err => {
        window.alert(err.error);
      })
    }
    else if (this.listFor !== '')
    {
      this.loadForPost(this.listFor);
    }
  }

  loadAll(){
    this.commentsService.getComments().subscribe(data => {
      this.comments = data;
    }, err => {
      window.alert(err.error);
    });
  }

  loadForPost(postID: String){
    this.commentsService.getCommentsByPostID(postID).subscribe(data => {
      this.comments = data;
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/CreateComment', { state: {post: this.listFor}});
  }

  onEdit(comment : Comment){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/EditComment', { state: comment });
  }
  onDelete(comment : Comment){
    //this.currentpostService.changeCurrentpost(post);
    this.commentsService.deleteComment(comment._id, comment.postID).subscribe(data => {
      this.comments.splice(this.comments.indexOf(comment),1);
    }, err => {
      window.alert(err.error);
      this.comments.splice(this.comments.indexOf(comment),1);
    });
  }
  onDetails(comment : Comment){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/DetailsComment', { state: comment });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
