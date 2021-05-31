import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../../../services/plants.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Plant } from '../../../models/plant';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit {

  plant: Plant = null;
  users: User[] = [];

  constructor(private plantsService : PlantsService, private router:Router, private activatedRoute:ActivatedRoute, private usersService : UsersService
    ) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.plant=history.state;
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onUpdate(species: String, irrigationInstructors: String, optimalTemp: Number,optimalSoilMoisture: Number, optimalSunExposure: Number,description: String){
    
    if(species === '' || irrigationInstructors === '' || optimalTemp === undefined || optimalSoilMoisture === undefined || optimalSunExposure  === undefined || description === '')
      window.alert('Please fill all fields');
    else{
      this.plant.species = species;
      this.plant.irrigationInstructors = irrigationInstructors;
      this.plant.optimalTemp = optimalTemp;
      this.plant.optimalSoilMoisture = optimalSoilMoisture;
      this.plant.optimalSunExposure = optimalSunExposure;
      this.plant.description = description;
      this.plantsService.updatePlant(this.plant).subscribe(data => {
        this.router.navigate(['/table-list']);
      }, err => {
        console.log(err.error);
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
