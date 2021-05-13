import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';

import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

    category: Category = null;
  
    constructor(private categoriesService : CategoriesService, private router: Router) { }
  
    ngOnInit(): void {
    }
    onCreate(name: string){
      if(name === '')
      window.alert('Please fill all fields');
      else{
        this.categoriesService.addCategory(name).subscribe(data => {
          this.category = data;
          this.router.navigate(['/table-list']);
        }, err => {
          window.alert(err.error);
          this.router.navigate(['/table-list']);
        });
      }
    }
}
