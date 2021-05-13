import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';

import { CommentsService } from '../../../services/comments.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-details-comment',
  templateUrl: './details-comment.component.html',
  styleUrls: ['./details-comment.component.css']
})
export class DetailsCommentComponent implements OnInit {

  comment: Comment = null;

  constructor(private commentsService : CommentsService, private router:Router, private activatedRoute:ActivatedRoute) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.comment=history.state;
  }

  onEdit(){
    this.router.navigateByUrl('/EditComment', { state: this.comment });

  }
  onDelete(){
    this.commentsService.deleteComment(this.comment._id).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
