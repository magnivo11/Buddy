import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
    user : User;  
  
    constructor(private usersService : UsersService, private router: Router, private toastrService : ToastrService ) { }
  
    ngOnInit(): void {
    }
    
    onCreate(firstName: string, lastName: string, email: string, password: string, description: string,isAdmin: Boolean){
      if(firstName === '' || lastName === '' || email === '' || password === '' || description === '' || isAdmin === undefined)
        this.toastrService.error('Please fill all fields', 'Error');  
      else{
        this.usersService.addUser(firstName, lastName, email, password, description, true).subscribe(data => {
          this.user = data;
          this.toastrService.success('Succeess');  
          this.router.navigate(['/table-list']);
        }, err => {
          this.toastrService.error(err.error.errors,'Error'); 
          this.router.navigate(['/table-list']);
        });
      }
    }
}
