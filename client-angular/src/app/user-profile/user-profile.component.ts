import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { UsersService } from "../services/users.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(private usersService: UsersService, private login: LoginService, private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.user = this.login.getConnectedUser();
  }

  onUpdate(firstName: String, lastName: String, email: String, password: String, description: String ) {
    if(firstName === '' || lastName === '' || email === '' || password === '' || description === '' )
    window.alert('Please fill all fields');
    else{
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.email = email;
      this.user.description = description;
      this.user.password = password;
      this.user.isAdmin = true;
      this.usersService.updateUser(this.user).subscribe((data) => {
        this.user = data;
      });
    }
  }
}
