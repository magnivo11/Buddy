import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../models/post';
import { ArticlesService } from '../../services/articles.service';
//import { CurrentArticleService } from 'src/app/services/current-article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles : Article[] = [];  
  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private articlesService : ArticlesService, private router: Router){}
  
  ngOnInit() {
    if(this.listFor === '')
    this.loadAll();
    else if (this.listFor !== '')
    {
      this.loadForCategory(this.listFor);
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
      this.articlesService.filter(this.search).subscribe(data =>{
        this.articles = data;
      }, err => {
        window.alert(err.error);
      })
    }
  }

  loadAll(){
    this.articlesService.getArticles().subscribe(data => {
      this.articles = data;
    }, err => {
      window.alert(err.error);
    });
  }

  loadForCategory(category: String){
    this.articlesService.getArticlesByCategory(category).subscribe(data => {
      this.articles = data;
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreateArticle', { state: {category: this.listFor}});
  }

  onEdit(article : Article){
    this.router.navigateByUrl('/EditArticle', { state: article });
  }
  onDelete(article : Article){
    this.articlesService.deleteArticle(article._id).subscribe(data => {
      this.articles.splice(this.articles.indexOf(article),1);
    }, err => {
      window.alert(err.error);
      this.articles.splice(this.articles.indexOf(article),1);
    });
  }
  onDetails(article : Article){
    this.router.navigateByUrl('/DetailsArticle', { state: article });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
