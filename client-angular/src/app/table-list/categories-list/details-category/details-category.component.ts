import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Category } from '../../../models/category';

import { CategoriesService } from '../../../services/categories.service';


@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.css']
})
export class DetailsCategoryComponent implements OnInit {

  
    category: Category = null;
    listFor: String;

    constructor(private categoriesService : CategoriesService, private router:Router, private activatedRoute:ActivatedRoute) {
      //this.router.getCurrentNavigation().extras.state;
    }
  
    ngOnInit(): void {
      this.category=history.state;
      this.listFor = this.category.name;
    }
  
    onEdit(){
      this.router.navigateByUrl('/EditCategory', { state: this.category });
    }

    onDelete(){
      this.categoriesService.deleteCategory(this.category._id).subscribe(data => {
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
}
