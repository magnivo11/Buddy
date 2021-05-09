import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-tab',
  templateUrl: './to-do-tab.component.html',
  styleUrls: ['./to-do-tab.component.css']
})
export class ToDoTabComponent implements OnInit {

  name: String = '';
  constructor(private user: UserService, private router: Router) {
    this.user.home()
      .subscribe(
        data => this.addName(data),
        error => this.router.navigate(['/login'])
      )
  }

  addName(data: any) {
    this.name = data.name; 
  }

  ngOnInit() {
  }

  logout() {
    this.user.logout()
      .subscribe(
        data => { console.log(data); this.router.navigate(['/login']) },
        error => console.error(error)
      )
  }
}
