import { Component, OnInit } from '@angular/core';
import{Garden} from '../../models/gardenModel'
import{GardenService} from '../../services/garden.service'

@Component({
  selector: 'app-gardens-view',
  templateUrl: './gardens-view.component.html',
  styleUrls: ['./gardens-view.component.css']
})
export class GardensViewComponent implements OnInit {

  gardensList:Garden[]=[]
  direction='north'
  directSun=true
  surroundings='indoor'

  

  constructor(private gardenService:GardenService) { }

  ngOnInit(): void {
  }

  selectDirection(event:any){
    this.direction=event.target.value

  }

  selectDirectSun(event:any){
    this.directSun=event.target.value

  }
  selectSurroundings(event:any){
    this.surroundings=event.target.value

  }
  getAllGardens(){

    this.gardenService.getGardens().subscribe((gardens)=>{this.gardensList=gardens})
  }
  getAllSelectedGardens(){
    this.gardenService.getSelectedGardens(this.direction,this.directSun,this.surroundings).subscribe((gardens)=>{this.gardensList=gardens})
  }


}
