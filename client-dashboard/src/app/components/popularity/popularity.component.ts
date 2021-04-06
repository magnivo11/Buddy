import { Component } from '@angular/core';
import { PlantService } from '../../services/plant.service'
 
@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['./popularity.component.css']
})
export class PopularityComponent {

  plantName = 'None'
 


  constructor(private plantService: PlantService) {
    this.plantService.getPopularity().subscribe((plantName) => {
      this.plantName = plantName; 
    });
  }





}




