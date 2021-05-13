import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';

import { CommentsService } from '../../../services/comments.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Article } from '../../../models/post';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  
    comment: Comment = null;
    article: String = '';
    articles: Article[] = [];
    isEditable = false;

    constructor(private commentsService : CommentsService, private articlesService : ArticlesService, private router:Router, private activatedRoute:ActivatedRoute) { }
  
    ngOnInit(): void {
      this.articlesService.getArticles().subscribe(articles => {
        this.articles = articles;
      });
      this.article=history.state.article;
      if(this.article !== ''){
        this.isEditable = true;
      }
    }

    onCreate(name: String, articleId: String, body: String){
      if(name === '' || articleId === undefined || body === '')
        window.alert('Please fill all fields');
      else{
        this.commentsService.addComment(name, articleId, body).subscribe(data => {
          this.comment = data;
          this.router.navigate(['/table-list']);
        }, err => {
          window.alert(err.error);
          this.router.navigate(['/table-list']);
        });
      }
    }
}
