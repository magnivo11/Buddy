import { Component } from '@angular/core';
import{GardenService} from '../../services/garden.service'

 @Component({
  selector: 'app-gardens-counter',
  templateUrl: './gardens-counter.component.html',
  styleUrls: ['./gardens-counter.component.css']
})
export class GardensCounterComponent     {

 gardenCount!: number; 

  constructor(private gardenService:GardenService) {
  this.gardenService.getGardens().subscribe((gardens)=>{this.gardenCount=gardens.length})

 }
 

}
