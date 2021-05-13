import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories : Category[] = [];  
  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private categoriesService : CategoriesService, private router: Router) {}
  
  ngOnInit() {
    this.load();
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true")
      this.load();
      
    if(this.listFor === "" || this.search === "")
    { 
      this.load();
    }
    else if(this.listFor === "search")
    { 
      this.categoriesService.filter(this.search).subscribe(data =>{
        this.categories = data;
      }, err => {
        window.alert(err.error);
      })
    }
  }

  load(){
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    }, err => {
      window.alert(err.error);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreateCategory', { state: {article: this.listFor}});
  }
  
  onEdit(category : Category){
    this.router.navigateByUrl('/EditCategory', { state: category });
  }
  onDelete(category : Category){
    this.categoriesService.deleteCategory(category._id).subscribe(data => {
      this.categories.splice(this.categories.indexOf(category),1);
    }, err => {
      window.alert(err.error);
      this.categories.splice(this.categories.indexOf(category),1);
    });
  }
  onDetails(category : Category){
    this.router.navigateByUrl('/DetailsCategory', { state: category });
  }

  handlePanel(action : string){
    this.load();
  }
}
