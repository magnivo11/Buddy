import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant';
import { PlantsService } from '../../../services/plants.service';
import { Router } from '@angular/router';
import { Garden } from '../../../models/garden';
import { GardensService } from '../../../services/gardens.service';

@Component({
  selector: 'app-create-userPlant',
  templateUrl: './create-userPlant.component.html',
  styleUrls: ['./create-userPlant.component.css']
})
export class CreateUserPlantComponent implements OnInit {

  plant: Plant = null;
  isEditable = false;
  gardens : Garden[] = [];  
  plants : Plant[] = [];  

  constructor(private plantsService : PlantsService, private gardensService : GardensService, private router: Router) { }

  ngOnInit(): void {
    // this.plant=history.state.user;
    // if(this.plant !== ''){
    //   this.isEditable = true;
    // }
    this.loadAllGardens();
    this.loadAllPlants();
  }

  onCreate(species: String, garden: String, growthStatus: String){
    if(species === '' || garden === ''  || growthStatus === '')
      window.alert('Please fill all fields');
    else{
      this.plantsService.addPlantForUser(species, garden, growthStatus).subscribe(data => {
        this.plant = data;
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.errors);
        this.router.navigate(['/table-list']);
      });
    }
  }

  loadAllGardens(){
    this.gardensService.getGardens().subscribe(data => {
      this.gardens = data;
    }, err => {
      window.alert(err.error);
    });
  }

  loadAllPlants() {
    this.plantsService.getAdminPlants().subscribe(data => {
      this.plants = data;
    }, err => {
      window.alert(err.error);
    });
  }
}
