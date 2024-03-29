import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant';
import { PlantsService } from '../../../services/plants.service';
import { Router } from '@angular/router';
import { Garden } from '../../../models/garden';
import { GardensService } from '../../../services/gardens.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-userPlant',
  templateUrl: './create-userPlant.component.html',
  styleUrls: ['./create-userPlant.component.css']
})
export class CreateUserPlantComponent implements OnInit {

  plant: Plant = null;
  isEditable = false;
  gardenFor: String = '';
  gardens : Garden[] = [];  
  plants : Plant[] = [];  

  constructor(private plantsService : PlantsService, private gardensService : GardensService, private router: Router, private toastrService : ToastrService    ) { }

  ngOnInit(): void {
    this.gardenFor=history.state.garden;
    if(this.gardenFor !== ''){
      this.isEditable = true;
    }
    this.loadAllGardens();
    this.loadAllPlants();
  }

  onCreate(species: String, garden: String, growthStatus: String){
    if(species === '' || garden === ''  || growthStatus === '')
      this.toastrService.error('Please fill all fields', 'Error');  
    else{
      this.plantsService.addPlantForUser(species, garden, growthStatus).subscribe(data => {
        this.plant = data;
        this.toastrService.success('Succeess');  
        this.router.navigate(['/table-list']);
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
        //this.router.navigate(['/table-list']);
      });
    }
  }

  loadAllGardens(){
    this.gardensService.getGardens().subscribe(data => {
      this.gardens = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
    });
  }

  loadAllPlants() {
    this.plantsService.getAdminPlants().subscribe(data => {
      this.plants = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
    });
  }
}
