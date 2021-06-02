import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userPlants-list',
  templateUrl: './userPlants-list.component.html',
  styleUrls: ['./userPlants-list.component.css']
})
export class UserPlantsListComponent implements OnInit {

  plants : Plant[] = [];  

  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private plantsService : PlantsService, private router: Router, private toastrService : ToastrService    ){}
  
  ngOnInit() {
    if(this.listFor === '')
    this.loadAll();
    else if (this.listFor !== '')
    {
      this.loadForGarden(this.listFor);
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
      this.plantsService.filterUser(this.search).subscribe(data =>{
        this.plants = data;
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
      })
    }
  }

  loadAll(){
    this.plantsService.getAllUsersPlants().subscribe(data => {
      this.plants = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
    });
  }

  loadForGarden(garden: String){
    this.plantsService.getPlantsByGarden(garden).subscribe(data => {
      this.plants = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreateUserPlant', { state: {user: this.listFor}});
  }

  onEdit(plant : Plant){
    this.router.navigateByUrl('/EditUserPlant', { state: plant });
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
    this.router.navigateByUrl('/DetailsUserPlant', { state: plant });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
