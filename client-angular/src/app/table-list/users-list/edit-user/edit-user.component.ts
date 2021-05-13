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

  onUpdate(firstname: string, lastname: string, email: string, password: string, phone: string ) {
    if(firstname === '' || lastname === '' || email === '' || password === '' || phone === '' )
    window.alert('Please fill all fields');
    else{
      this.user.firstname = firstname;
      this.user.lastname = lastname;
      this.user.email = email;
      this.user.phone = phone;
      this.user.password = password;
      this.user.isAdmin = true;
      this.usersService.updateUser(this.user).subscribe((data) => {
        this.user = data;
        this.router.navigate(["/table-list"]);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
