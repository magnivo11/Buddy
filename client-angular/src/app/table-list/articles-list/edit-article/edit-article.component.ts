import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Article } from '../../../models/post';
import { Category } from '../../../models/category';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: Article = null;
  categories: Category[] = [];

  constructor(private articlesService : ArticlesService, private router:Router, private activatedRoute:ActivatedRoute, private categoriesService : CategoriesService
    ) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.article=history.state;
  }

  onUpdate(title: String, subTitle: String, img: String, category: String, body: String){
    
    if(title === '' || subTitle === '' || img === '' || category === '' || body === '')
      window.alert('Please fill all fields');
    else{
      this.article.title = title;
      this.article.subTitle = subTitle;
      this.article.img = img;
      this.article.category = category;
      this.article.body = body;
      this.articlesService.updateArticle(this.article).subscribe(data => {
        this.article = data;
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
