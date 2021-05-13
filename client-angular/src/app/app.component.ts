import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private show = false;
  private showLogin = false;
  constructor(private ls: LoginService) {
    // if (localStorage.getItem('token')) {
    // this.show = true;
    // }
    this.ls.showLoginComponent.subscribe(val => this.showLogin = val)
    this.ls.isLogin.subscribe(val => this.show = val);
  }
}
