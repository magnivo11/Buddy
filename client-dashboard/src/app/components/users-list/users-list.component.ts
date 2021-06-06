import { Component, OnInit } from '@angular/core';
import { User } from '../../models/userModel'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList: User[] = []
  adminList: String[] = []
  usersButton = 'Display all users'
  adminsButton = 'Users grouped by admin'
  showUser = false
  showAdmin = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getAllUsers() {
    this.showUser = !this.showUser;
    if (this.showUser)
      this.usersButton = "Hide all users";
    else
      this.usersButton = "Display all users";
    this.userService.getUsers().subscribe((users) => { this.usersList = users })
  }
  getUsersGroupedByAdmin() {
    this.showAdmin = !this.showAdmin;
    if (this.showAdmin)
      this.adminsButton = "Hide groupBy";
    else
      this.adminsButton = "Users grouped by admin";
    this.userService.getUsersGroupedByAdmin().subscribe((admins) => {
      this.adminList = admins;
    })
  }
}



