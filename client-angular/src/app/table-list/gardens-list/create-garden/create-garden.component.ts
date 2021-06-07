import { Component, OnInit } from '@angular/core';
import { Garden } from '../../../models/garden';
import { GardensService } from '../../../services/gardens.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-garden',
  templateUrl: './create-garden.component.html',
  styleUrls: ['./create-garden.component.css']
})
export class CreateGardenComponent implements OnInit {

  garden: Garden = null;
  user: String = '';
  users: User[] = [];
  isEditable = false;

  constructor(private gardensService : GardensService, private router: Router, private usersService : UsersService, private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.user=history.state.user;
      if(this.user !== ''){
        this.isEditable = true;
      }
    });
  }

  onCreate(name: String, direction: String, directSun: boolean,surrounding: String, userID: String){
    if(name === '' || direction === '' || directSun === undefined || surrounding === '' || userID  === '')
      this.toastrService.error('Please fill all fields', 'Error');  

    else{
      this.gardensService.addGarden(name, direction, directSun,surrounding,userID).subscribe(data => {
        this.garden = data;
        this.toastrService.success('Succeess');  
        this.router.navigate(['/table-list']);
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  

        //this.router.navigate(['/table-list']);
      });
    }
  }
}
