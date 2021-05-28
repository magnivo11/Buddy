import { Component, OnInit } from '@angular/core';
import { GardensService } from '../../../services/gardens.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Garden } from '../../../models/garden';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-garden',
  templateUrl: './edit-garden.component.html',
  styleUrls: ['./edit-garden.component.css']
})
export class EditGardenComponent implements OnInit {

  garden: Garden = null;
  users: User[] = [];

  constructor(private gardensService : GardensService, private router:Router, private activatedRoute:ActivatedRoute, private usersService : UsersService
    ) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.garden=history.state;
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onUpdate(name: String, direction: String, directSun: boolean,surrounding: String, userID: String){
    
    if(name === '' || direction === '' || directSun === undefined || surrounding === '' || userID  === '')
      window.alert('Please fill all fields');
    else{
      this.garden.name = name;
      this.garden.direction = direction;
      this.garden.directSun = directSun;
      this.garden.surrounding = surrounding;
      this.garden.userID = userID;
      this.gardensService.updateGarden(this.garden).subscribe(data => {
        this.router.navigate(['/table-list']);
      }, err => {
        console.log(err.error);
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
