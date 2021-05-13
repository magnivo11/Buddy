import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/post';
import { ArticlesService } from '../../../services/articles.service';
import { Router } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoriesService } from '../../../services/categories.service';



@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: Article = null;
  category: String = '';
  categories: Category[] = [];
  isEditable = false;

  constructor(private articlesService : ArticlesService, private router: Router, private categoriesService : CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.category=history.state.category;
    if(this.category !== ''){
      this.isEditable = true;
    }
  }

  onCreate(title: String, subTitle: String, img: String, category: String, body: String){
    if(title === '' || subTitle === '' || img === '' || category === '' || body === '')
      window.alert('Please fill all fields');
    else{
      this.articlesService.addArticle(title, subTitle, img, category, body).subscribe(data => {
        this.article = data;
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
