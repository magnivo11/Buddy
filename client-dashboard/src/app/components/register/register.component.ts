import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    name:new FormControl(null,Validators.required),
    lastName: new FormControl(null,Validators.required),
    secretkey:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
   })
  constructor(private _router:Router,private _userService:UserService) { }
   ngOnInit() {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){
    console.log("here")
    if(!this.registerForm.valid || (this.registerForm.controls.secretkey.value != "admincode")){
      console.log('Invalid Form'); return;
    }

    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/login']);},
      error=>console.error(error)
    )
  }
}