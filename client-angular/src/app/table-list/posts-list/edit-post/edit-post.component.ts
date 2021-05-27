import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post = null;
  users: User[] = [];

  constructor(private PostsService : PostsService, private router:Router, private activatedRoute:ActivatedRoute, private usersService : UsersService
    ) {
    //this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.post=history.state;
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onUpdate(content: String, userID: String, status: String){
    
    if(content === '' || userID === '' || status === '' )
      window.alert('Please fill all fields');
    else{
      this.post.content = content;
      this.post.userID = userID;
      this.post.status = status;
      this.PostsService.updatePost(this.post).subscribe(data => {
        this.post = data;
        this.router.navigate(['/table-list']);
      }, err => {
        window.alert(err.error);
        this.router.navigate(['/table-list']);
      });
    }
  }
}
