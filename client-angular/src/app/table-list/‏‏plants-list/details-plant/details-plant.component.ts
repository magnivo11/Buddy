import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../../../services/plants.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Plant } from '../../../models/plant';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-details-plant',
  templateUrl: './details-plant.component.html',
  styleUrls: ['./details-plant.component.css']
})
export class DetailsPlantComponent implements OnInit {

  plant: Plant = null;
  listFor: String;

  constructor(private plantsService : PlantsService, private router:Router, private activatedRoute:ActivatedRoute) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.plant=history.state;
    this.listFor = this.plant._id;
  }

  onEdit(){
    this.router.navigateByUrl('/EditPlant', { state: this.plant });
  }
  
  onDelete(){
    this.plantsService.deletePlant(this.plant._id, this.plant.GardenID).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
