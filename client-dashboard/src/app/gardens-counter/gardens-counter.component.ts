import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gardens-counter',
  templateUrl: './gardens-counter.component.html',
  styleUrls: ['./gardens-counter.component.css']
})
export class GardensCounterComponent {
  curGardenCounter?:Number;  

  constructor() { 
    this.curGardenCounter=6;

  }

}
