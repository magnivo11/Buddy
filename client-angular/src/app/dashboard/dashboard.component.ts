import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { RealTimeService } from '../services/real-time.service';
import { PostsService } from '../services/posts.service';
import { PlantsService } from '../services/plants.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeUsersCounter : Number;
  plantsCounter : Number;
  postsCounter : Number;

  constructor(private realTimeservice : RealTimeService, private postsService : PostsService, private plantsService : PlantsService){

  }

  ngOnInit() {
    this.postsService.getNumOfPosts().subscribe((count) => {
      this.postsCounter = count;
    });
    this.plantsService.getNumOfPlants().subscribe((count) => {
      this.plantsCounter = count;
    });
    this.realTimeservice.getNumOfActiveUsers().subscribe((count) => {
      this.activeUsersCounter = count;
    });
    this.load(); 
  }

  load() {
    this.realTimeservice.currentActiveUsersCounter.subscribe(counter => this.activeUsersCounter = counter);
    this.realTimeservice.currentPlantsCounter.subscribe(counter => this.plantsCounter = counter);
    this.realTimeservice.currentPostsCounter.subscribe(counter => this.postsCounter = counter);
  } 
}
