import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  loggedUser: User;
  users : User[] = [];  
  @Input() search: string = '';
  isLogin = false;
  @Input() refresh: string = "false";


  constructor(private usersService : UsersService,  private router: Router, private loginService : LoginService, private toastrService : ToastrService    ){}

  ngOnInit() {
    this.loadAll();      
    this.loggedUser = this.loginService.getConnectedUser();
  }

  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.search === "")
    { 
      this.loadAll();
    }
    else
    { 
      this.usersService.filter(this.search).subscribe(data =>{
        this.users = data;
      }, err => {
        this.toastrService.error(err.error.errors,'Error'); 
      })
    }

    if(this.refresh === "true")
      this.loadAll();
  } 

  loadAll(){
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error'); 
    });
  }

  isLoggedIn(user : User){
    if(user._id === this.loggedUser._id)
      return false;
    return true;
  }

  onCreate(){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/CreateUser');
  }

  onEdit(user : User){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/EditUser', { state: user });
  }
  onDelete(user : User){
    //this.currentpostService.changeCurrentpost(post);
    this.usersService.deleteUser(user._id).subscribe(data => {
      this.toastrService.success('Succeess');  
      this.users.splice(this.users.indexOf(user),1);
    }, err => {
      this.toastrService.error(err.error.errors,'Error'); 
      //this.users.splice(this.users.indexOf(user),1);
    });
  }
  onDetails(user : User){
    //this.currentpostService.changeCurrentpost(post);
    this.router.navigateByUrl('/DetailsUser', { state: user });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
