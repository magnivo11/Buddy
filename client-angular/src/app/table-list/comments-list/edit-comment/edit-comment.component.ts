import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';

import { CommentsService } from '../../../services/comments.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  
    comment: Comment = null;
    posts: Post[] = [];
    users: User[] = [];

    constructor(private commentsService : CommentsService, private postsService : PostsService, private usersService : UsersService,
      private router:Router, private activatedRoute:ActivatedRoute) {
      //this.router.getCurrentNavigation().extras.state;
    }
  
    ngOnInit(): void {
      this.comment=history.state;
      this.postsService.getPosts().subscribe(posts => {
        this.posts = posts;
      });
      this.usersService.getUsers().subscribe(users => {
        this.users = users;
      });
    }
  
    onUpdate(userID: String, postID: String, content: String){
      if(userID === '' || postID === undefined || content === '')
        window.alert('Please fill all fields');
      else{
        this.comment.userID = userID;
        this.comment.postID = postID;
        this.comment.content = content;
        this.commentsService.updateComment(this.comment).subscribe(data => {
          this.comment = data;
          this.router.navigate(['/table-list']);
        }, err => {
          window.alert(err.error);
          this.router.navigate(['/table-list']);
        });
      }
    }

}
