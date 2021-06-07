import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})
export class PlantsListComponent implements OnInit {

  plants : Plant[] = [];  
  @Input() gardenFor: String = '';
  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";
  isShow = true;

  constructor(private plantsService : PlantsService, private router: Router, private toastrService : ToastrService ){}
  
  ngOnInit() {
    if(this.listFor === ''){
      this.isShow = true;
      this.loadAll();
    }
    else if (this.listFor === 'garden')
    {
      this.isShow = true;
      this.loadForGarden(this.gardenFor);
    } 
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true"){
      this.isShow = true;
      this.loadAll();
    }
    if(this.listFor === "" || this.search === "")
    { 
      this.isShow = true;
      this.loadAll();
    }
    else if(this.listFor === "search")
    { 
      this.plantsService.filterAdmin(this.search).subscribe(data =>{
        if(data.length === 0){
          this.isShow = false;
        }
        else{
          this.plants = data;
        }
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
      })
    }
  }

  loadAll(){
    this.plantsService.getAdminPlants().subscribe(data => {
      this.plants = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
    });
  }

  loadForGarden(user: String){
    this.plantsService.getPlantsByGarden(user).subscribe(data => {
      this.plants = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreatePlant', { state: {user: this.listFor}});
  }

  onEdit(plant : Plant){
    this.router.navigateByUrl('/EditPlant', { state: plant });
  }
  onDelete(plant : Plant){
    this.plantsService.deletePlant(plant._id, plant.GardenID).subscribe(data => {
      this.toastrService.success('Succeess');  
      this.plants.splice(this.plants.indexOf(plant),1);
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      //this.plants.splice(this.plants.indexOf(plant),1);
    });
  }
  onDetails(plant : Plant){
    this.router.navigateByUrl('/DetailsPlant', { state: plant });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
