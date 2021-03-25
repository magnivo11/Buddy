import { Component } from '@angular/core';
import {SensorService} from '../../services/sensor.service'

@Component({
  selector: 'app-sensors-counter',
  templateUrl: './sensors-counter.component.html',
  styleUrls: ['./sensors-counter.component.css']
})
export class SensorsCounterComponent  {

  sensorCounter!: number;

  constructor(private sensorService: SensorService) {
    this.sensorService.getSensors().subscribe((sensors) => { this.sensorCounter = sensors.length })
  }
}
