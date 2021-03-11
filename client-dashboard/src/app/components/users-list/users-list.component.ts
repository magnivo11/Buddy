import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { User } from 'src/app/models/userModel';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent  implements OnInit {

  @Output() userList = new EventEmitter<string>(); 

  users : User[] = [];  

  constructor(private UserService : UserService,
              private CurrentUserService: CurrentUserService) {}

  ngOnInit() {
    this.load();
  }

 load(){
   this.UserService.getUsers().subscribe(data => {
    this.users = data;
   })
 }
 handlePanel(action : string){
  this.load();
}

   
 onClick(user : User){
   /*
  this.CurrentUserService.changeCurrentArticle(user);
  */
}

}
