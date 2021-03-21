import { Component, OnInit } from '@angular/core';
import{User} from '../../models/userModel'
import{UserService} from '../../services/user.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList:User[]=[]
  adminList:String[]=[]

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  getAllUsers(){

    this.userService.getUsers().subscribe((users)=>{this.usersList=users})
  }
  getUsersGroupedByAdmin(){
    this.userService.getUsersGroupedByAdmin().subscribe((admins)=>{
      this.adminList=admins;
    })
  }
}
 


