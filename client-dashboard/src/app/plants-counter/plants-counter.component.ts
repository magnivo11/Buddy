import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plants-counter',
  templateUrl: './plants-counter.component.html',
  styleUrls: ['./plants-counter.component.css']
})
export class PlantsCounterComponent {
  curPlantsCounter?:Number;  

  constructor() {
   this.curPlantsCounter=99;
   }
 

}

 