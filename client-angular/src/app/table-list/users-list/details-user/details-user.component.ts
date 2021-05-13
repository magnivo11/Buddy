import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  
  loggedUser: User;
  user: User = null;
  
    constructor(private usersService : UsersService, private router:Router, private activatedRoute:ActivatedRoute, private loginService : LoginService
      ) {
      //this.router.getCurrentNavigation().extras.state;
    }
  
    ngOnInit(): void {
      this.user=history.state;
      this.loggedUser = this.loginService.getConnectedUser();
    }
  
    onEdit(){
      this.router.navigateByUrl('/EditUser', { state: this.user });
  
    }

    isLoggedIn(user : User){
      if(user._id === this.loggedUser._id)
        return false;
      return true;
    }
    
    onDelete(){
      this.usersService.deleteUser(this.user._id).subscribe(data => {
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
}
