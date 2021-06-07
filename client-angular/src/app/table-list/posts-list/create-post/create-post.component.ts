import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: Post = null;
  userFor: String = '';
  users: User[] = [];
  isEditable = false;

  constructor(private postsService : PostsService, private router: Router, private usersService : UsersService, private toastrService : ToastrService    ) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.userFor=history.state.user;
    if(this.userFor !== ''){
      this.isEditable = true;
    }
    
  }

  onCreate(content: String, userID: String, status: String){
    if(content === '' || userID === '' || status === '')
      this.toastrService.error('Please fill all fields', 'Error');  
    else{
      this.postsService.addPost(content, status, userID).subscribe(data => {
        this.post = data;
        this.toastrService.success('Succeess');  
        this.router.navigate(['/table-list']);
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
        //this.router.navigate(['/table-list']);
      });
    }
  }
}
