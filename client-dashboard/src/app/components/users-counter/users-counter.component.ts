import { Component } from '@angular/core';
import { RealtimeService } from '../../realtime.service'
@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.css']
})
export class UsersCounterComponent  {
  currCounter? : Number;  

constructor(private service:RealtimeService)
{
  this.currCounter=0; 
  service.currentCounter.subscribe(currCounter=>this.currCounter=currCounter);
}

}
