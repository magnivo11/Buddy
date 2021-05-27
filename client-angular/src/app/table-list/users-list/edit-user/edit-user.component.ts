import { Component, OnInit } from "@angular/core";
import { User } from "../../../models/User";
import { UsersService } from "../../../services/users.service";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"],
})
export class EditUserComponent implements OnInit {
  user: User = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.user = history.state;
  }

  onUpdate(firstName: String, lastName: String, email: String, password: String, description: String, isAdmin: Boolean) {
    if(firstName === '' || lastName === '' || email === '' || password === '' || description === '' )
      window.alert('Please fill all fields');
    else{
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.email = email;
      this.user.password = password;
      this.user.description = description;
      this.user.isAdmin = isAdmin;
      this.usersService.updateUser(this.user).subscribe((data) => {
        this.user = data;
        this.router.navigate(["/table-list"]);
      }, err => {
        window.alert(err.errors);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
