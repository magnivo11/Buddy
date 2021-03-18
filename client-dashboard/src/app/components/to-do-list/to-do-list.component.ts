import { Component, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/realtime.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  message:String

  constructor(private service:RealtimeService) {
    
    this.message=''
    this.service.adminMessage.subscribe(message=>this.message=message)
   }

  ngOnInit(): void {
  }

  saveChanges(){
    this.service.sendMessage(this.message)
  }

}
