import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';

import { CommentsService } from '../../../services/comments.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Article } from '../../../models/post';
import { ArticlesService } from '../../../services/articles.service';




@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  
    comment: Comment = null;
    articles: Article[] = [];

    constructor(private commentsService : CommentsService, private articlesService : ArticlesService,
      private router:Router, private activatedRoute:ActivatedRoute) {
      //this.router.getCurrentNavigation().extras.state;
    }
  
    ngOnInit(): void {
      this.articlesService.getArticles().subscribe(articles => {
        this.articles = articles;
      });

      this.comment=history.state;
    }
  
    onUpdate(name: String, articleId: String, body: String){
      if(name === '' || articleId === undefined || body === '')
        window.alert('Please fill all fields');
      else{
        this.comment.name = name;
        this.comment.articleId = articleId;
        this.comment.body = body;
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
