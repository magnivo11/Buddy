import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  isLogin: any;
  loginBtn =  false;
  constructor(private ls: LoginService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.ls.setIsLogin(true, JSON.parse(localStorage.getItem('user')));
    }
    this.ls.isLogin.subscribe(res => this.isLogin = res);
  }
  logout() {
    if (window.confirm('Are you sure you want to log out?')){
      localStorage.removeItem('user');
      this.ls.setIsLogin(false, null);
      this.ls.showLogin(false);
      this.loginBtn = !this.loginBtn
      this.router.navigate(['logout'])
  
      this.ls.showLogin(this.loginBtn);
    }
  }

  showLogin() {
    this.loginBtn = !this.loginBtn
    this.ls.showLogin(this.loginBtn);
  }
}
