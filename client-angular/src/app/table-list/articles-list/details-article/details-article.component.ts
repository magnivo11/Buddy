import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Article } from '../../../models/post';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {

  article: Article = null;
  listFor: String;
  constructor(private articlesService : ArticlesService, private router:Router, private activatedRoute:ActivatedRoute) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.article=history.state;
    this.listFor = this.article._id;
  }

  onEdit(){
    this.router.navigateByUrl('/EditArticle', { state: this.article });

  }
  onDelete(){
    this.articlesService.deleteArticle(this.article._id).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
