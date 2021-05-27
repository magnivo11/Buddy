import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: Post = null;
  user: String = '';
  users: User[] = [];
  isEditable = false;

  constructor(private postsService : PostsService, private router: Router, private usersService : UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.user=history.state.user;
    if(this.user !== ''){
      this.isEditable = true;
    }
  }

  onCreate(content: String, userID: String, status: String){
    if(content === '' || userID === '' || status === '')
      window.alert('Please fill all fields');
    else{
      this.postsService.addPost(content, status, userID).subscribe(data => {
        this.post = data;
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
