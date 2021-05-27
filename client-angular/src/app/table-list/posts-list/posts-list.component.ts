import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts : Post[] = [];  

  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private PostsService : PostsService, private router: Router){}
  
  ngOnInit() {
    if(this.listFor === '')
    this.loadAll();
    else if (this.listFor !== '')
    {
      this.loadForUser(this.listFor);
    } 
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true")
      this.loadAll();
    if(this.listFor === "" || this.search === "")
    { 
      this.loadAll();
    }
    else if(this.listFor === "search")
    { 
      this.PostsService.filter(this.search).subscribe(data =>{
        this.posts = data;
      }, err => {
        window.alert(err.error);
      })
    }
  }

  loadAll(){
    this.PostsService.getPosts().subscribe(data => {
      this.posts = data;
    }, err => {
      window.alert(err.error);
    });
  }

  loadForUser(user: String){
    this.PostsService.getPostsByUser(user).subscribe(data => {
      this.posts = data;
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreatePost', { state: {user: this.listFor}});
  }

  onEdit(post : Post){
    this.router.navigateByUrl('/EditPost', { state: post });
  }
  onDelete(post : Post){
    this.PostsService.deletePost(post._id, post.userID).subscribe(data => {
      this.posts.splice(this.posts.indexOf(post),1);
    }, err => {
      window.alert(err.error);
      this.posts.splice(this.posts.indexOf(post),1);
    });
  }
  onDetails(post : Post){
    this.router.navigateByUrl('/DetailsPost', { state: post });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
