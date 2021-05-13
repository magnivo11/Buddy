import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Category } from '../../../models/category';

import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  
    category: Category = null;
  
    constructor(private categoriesService : CategoriesService, private router:Router, private activatedRoute:ActivatedRoute) {
      //this.router.getCurrentNavigation().extras.state;
    }
  
    ngOnInit(): void {
      this.category=history.state;
    }
  
    onUpdate(name: String){
      if(name === '')
      window.alert('Please fill all fields');
      else{
        this.category.name = name;
        this.categoriesService.updateCategory(this.category).subscribe(data => {
          this.category = data;
          this.router.navigate(['/table-list']);
        }, err => {
          window.alert(err.error);
          this.router.navigate(['/table-list']);
        });
      }
    }

}
