import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

import { CommentsService } from '../../../services/comments.service';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-details-comment',
  templateUrl: './details-comment.component.html',
  styleUrls: ['./details-comment.component.css']
})
export class DetailsCommentComponent implements OnInit {

  comment: Comment = null;
  user: User = null;

  constructor(private commentsService : CommentsService, private usersService : UsersService, private router:Router, private activatedRoute:ActivatedRoute) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.comment=history.state;
    this.usersService.getUser(this.comment.userID).subscribe(user => {
      this.user = user;
    });
  }

  onEdit(){
    this.router.navigateByUrl('/EditComment', { state: this.comment });

  }
  onDelete(){
    this.commentsService.deleteComment(this.comment._id, this.comment.postID).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
