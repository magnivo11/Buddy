import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  delete = false;
  login = true;

  btnLogin = 'Login';
  toggleLink = 'Forgot Password?';
  form = {
    email: '',
    password: ''
  };
  constructor(private ls: LoginService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  deleteUser() {

  }
  resetCredentials() {

  }
  toggle() {
    this.login = !this.login;
    if (!this.login) {
      this.btnLogin = 'Reset';
      this.toggleLink = 'Login?';
    }
    else { 
      this.btnLogin = 'Login';
      this.toggleLink = 'Forgot Password?';
    }
  }
  onSubmit(formData) {
    if (this.login) {
      this.ls.onLogin(formData.form.value).subscribe(
        (res: any) => {
          if(res.user.isAdmin === false)
          {
            this.toastr.success('Please try agian or check your permmissions','This user is not labaled as admin');

            alert('You are not an admin, try again.');
            this.ls.setShowLoginComp(true)
            return;
          }
          localStorage.setItem('token', res.sessionToken);
          localStorage.setItem('user', JSON.stringify(res.user));
         // this.ls.setToken(res.sessionToken);
          // this.ls.setIsLogin(true);
          console.log(res);
          this.ls.setIsLogin(true, res.user);

          this.router.navigate(['/dashboard'], { relativeTo: this.route });
        }, (error: any) => {
          console.log(error);
          alert('email and password did not match');
        });
    }
    else if (!this.login && !this.delete) {
      this.ls.onUpdate(formData.form.value).subscribe(
        (res: any) => alert('Your password is updated'),
        (error: any) => {
          console.log(error); 
          alert('email and password did not match');
        }
      );
    }
    this.ls.setShowLoginComp(false)
  }
}
