import { Component, OnInit } from '@angular/core';
import { GardensService } from '../../../services/gardens.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Garden } from '../../../models/garden';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-garden',
  templateUrl: './edit-garden.component.html',
  styleUrls: ['./edit-garden.component.css']
})
export class EditGardenComponent implements OnInit {

  garden: Garden = null;
  users: User[] = [];

  constructor(private gardensService : GardensService, private router:Router, private activatedRoute:ActivatedRoute, private usersService : UsersService
    , private toastrService : ToastrService) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.garden=history.state;
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onUpdate(name: String, direction: String, directSun: boolean,surrounding: String, userID: String){

    if( name === '' || direction === '' || directSun === undefined || surrounding === '' || userID  === '')
      this.toastrService.error('Please fill all fields', 'Error');  
    else{
      this.garden.name = name;
      this.garden.direction = direction;
      this.garden.directSun = directSun;
      this.garden.surrounding = surrounding;
      this.garden.userID = userID;
      this.gardensService.updateGarden(this.garden).subscribe(data => {
        this.toastrService.success('Succeess');  
        this.router.navigate(['/table-list']);
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
        this.router.navigate(['/table-list']);
      });
    }
  }
}
