import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {User} from 'src/app/models/userModel'
import {UserService} from 'src/app/services/user.service'
import {CurrentUserService} from 'src/app/services/current-user.service'

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent /*implements OnInit*/ {
/*
  user :User;
  subscription: Subscription;

  constructor(private userService: UserService,
              private CurrentUserService: CurrentUserService) { }

  ngOnInit() {
    this.subscription= this.CurrentUserService.currentUser.subscribe(
      user => this.user = user;
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onRefresh(){
    this.userService.getUser(this.user._id).subscribe(user => {
      this.user = user;
    });
  }
  */
}
