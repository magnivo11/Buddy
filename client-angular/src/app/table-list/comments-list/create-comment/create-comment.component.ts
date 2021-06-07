import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

import { CommentsService } from '../../../services/comments.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Post } from '../../../models/post';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  
    comment: Comment = null;
    postFor: String = '';
    userFor: String = '';
    posts: Post[] = [];
    isEditableUser = false;
    isEditablePost = false;
    users: User[] = [];

    constructor(private commentsService : CommentsService, private postsService : PostsService, private usersService : UsersService,
      private router:Router, private activatedRoute:ActivatedRoute, private toastrService : ToastrService
      ) { }
  
    ngOnInit(): void {
      this.postsService.getPosts().subscribe(posts => {
        this.posts = posts;
      });
      this.usersService.getUsers().subscribe(users => {
        this.users = users;
      });
      this.postFor=history.state.post;
      this.userFor=history.state.user;
      if(this.postFor !== ''){
        this.isEditablePost = true;
      }
      if(this.userFor !== ''){
        this.isEditableUser = true;
      }
    }

    onCreate(userID: String, postId: String, body: String){
      if(userID === '' || postId === undefined || body === '')
        this.toastrService.error('Please fill all fields', 'Error');  
      else{
        this.commentsService.addComment(userID, postId, body).subscribe(data => {
          this.comment = data;
          this.toastrService.success('Succeess');  
          this.router.navigate(['/table-list']);
        }, err => {
          this.toastrService.error(err.error.errors,'Error');  
          //this.router.navigate(['/table-list']);
        });
      }
    }
}
