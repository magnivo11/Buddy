import { Component, OnInit } from '@angular/core';
import { GardensService } from '../../../services/gardens.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Garden } from '../../../models/garden';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-details-garden',
  templateUrl: './details-garden.component.html',
  styleUrls: ['./details-garden.component.css']
})
export class DetailsGardenComponent implements OnInit {

  garden: Garden = null;
  listFor: String;
  users: User[] = [];

  constructor(private gardensService : GardensService, private router:Router, private activatedRoute:ActivatedRoute, private usersService : UsersService) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.garden=history.state;
    this.listFor = 'garden';
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onEdit(){
    this.router.navigateByUrl('/EditGarden', { state: this.garden });
  }
  
  onDelete(){
    this.gardensService.deleteGarden(this.garden._id, this.garden.userID).subscribe(data => {
      this.router.navigate(['/table-list']);
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }
}
