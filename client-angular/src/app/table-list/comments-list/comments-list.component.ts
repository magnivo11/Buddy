import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  comments :  Comment[] = [];
  @Input() userFor: String = '';
  @Input() postFor: String = '';  
  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";
  isShow = true;

  constructor(private commentsService :  CommentsService, private router: Router, private toastrService : ToastrService
    ){}
  
  ngOnInit() {
    if(this.listFor === ''){
      this.isShow = true;
      this.loadAll();
    }
    else if (this.listFor === 'post')
    {
      this.isShow = true;
      this.loadForPost(this.postFor);
    }
    else if (this.listFor === 'user')
    {
      this.isShow = true;
      this.loadForUser(this.userFor);
    }
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true"){
      this.isShow = true;
      this.loadAll();
    }
    if(this.listFor === "" || this.search === "")
    { 
      this.isShow = true;
      this.loadAll();
    }
    else if(this.listFor === "search")
    { 
      this.commentsService.filter(this.search).subscribe(data =>{ 
        if(data.length === 0){
          this.isShow = false;
        }
        else{
          this.comments = data;
        }
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
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
      this.toastrService.error(err.error.errors,'Error');  
    });
  }

  loadForPost(postID: String){
    this.commentsService.getCommentsByPostID(postID).subscribe(data => {
      this.comments = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      this.router.navigate(['/table-list']);
    });
  }

  loadForUser(userID: String){
    this.commentsService.getCommentsByUserID(userID).subscribe(data => {
      this.comments = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/CreateComment', { state: {post: this.postFor, user: this.userFor}});
  }

  onEdit(comment : Comment){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/EditComment', { state: comment });
  }
  onDelete(comment : Comment){
    //this.currentpostService.changeCurrentpost(post);
    this.commentsService.deleteComment(comment._id, comment.postID).subscribe(data => {
      this.toastrService.success('Success');  
      this.comments.splice(this.comments.indexOf(comment),1);
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      //this.comments.splice(this.comments.indexOf(comment),1);
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
