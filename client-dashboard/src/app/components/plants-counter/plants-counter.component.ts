import { Component } from '@angular/core';
import { PlantService } from '../../services/plant.service'

@Component({
  selector: 'app-plants-counter',
  templateUrl: './plants-counter.component.html',
  styleUrls: ['./plants-counter.component.css']
})
export class PlantsCounterComponent {
  plantCount!: number;

  constructor(private plantService: PlantService) {
    this.plantService.getPlants().subscribe((plants) => { this.plantCount = plants.length })
  }


}
