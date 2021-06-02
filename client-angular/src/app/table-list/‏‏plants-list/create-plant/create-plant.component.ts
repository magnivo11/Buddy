import { Component, OnInit } from '@angular/core';
import { Plant } from '../../../models/plant';
import { PlantsService } from '../../../services/plants.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {

  plant: Plant = null;
  isEditable = false;

  constructor(private plantsService : PlantsService, private router: Router, private toastrService : ToastrService
    ) { }

  ngOnInit(): void {
    // this.plant=history.state.user;
    // if(this.plant !== ''){
    //   this.isEditable = true;
    // }
  }

  onCreate(species: String, irrigationInstructors: String, optimalTemp: Number,optimalSoilMoisture: Number, optimalSunExposure: Number,description: String){
    if(species === '' || irrigationInstructors === '' || optimalTemp === undefined || optimalSoilMoisture === undefined || optimalSunExposure  === undefined || description === '')
      this.toastrService.error('Please fill all fields', 'Error');  
    else{
      this.plantsService.addPlant(species, irrigationInstructors, optimalTemp,optimalSoilMoisture,optimalSunExposure,description).subscribe(data => {
        this.plant = data;
        this.toastrService.success('Succeess');  
        this.router.navigate(['/table-list']);
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
        this.router.navigate(['/table-list']);
      });
    }
  }
}
