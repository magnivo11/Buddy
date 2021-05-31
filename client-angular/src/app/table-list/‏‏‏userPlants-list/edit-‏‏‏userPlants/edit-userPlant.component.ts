import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../../../services/plants.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Plant } from '../../../models/plant';
import { Garden } from '../../../models/garden';
import { GardensService } from '../../../services/gardens.service';

@Component({
  selector: 'app-edit-userPlant',
  templateUrl: './edit-userPlant.component.html',
  styleUrls: ['./edit-userPlant.component.css']
})
export class EditUserPlantComponent implements OnInit {

  plant: Plant = null;
  gardens : Garden[] = [];  

  constructor(private plantsService : PlantsService, private gardensService : GardensService, private router:Router, private activatedRoute:ActivatedRoute
    ) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.plant=history.state;

    this.gardensService.getGardens().subscribe(data => {
      this.gardens = data;
    }, err => {
      window.alert(err.error);
    });
  }

  onUpdate(species: String, garden: String, growthStatus: String){
    
    if(species === '' || garden === '' || growthStatus === '')
      window.alert('Please fill all fields');
    else{
      this.plant.species = species;
      this.plant.GardenID = garden;
      this.plant.growthStatus = growthStatus;
      this.plantsService.updateUserPlant(this.plant).subscribe(data => {
        this.router.navigate(['/table-list']);
      }, err => {
        console.log(err.error);
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
