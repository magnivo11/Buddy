import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Garden } from '../../models/garden';
import { GardensService } from '../../services/gardens.service';

@Component({
  selector: 'app-gardens-list',
  templateUrl: './gardens-list.component.html',
  styleUrls: ['./gardens-list.component.css']
})
export class GardensListComponent implements OnInit {

  gardens : Garden[] = [];  

  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";

  constructor(private gardensService : GardensService, private router: Router){}
  
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
      this.gardensService.filter(this.search).subscribe(data =>{
        this.gardens = data;
      }, err => {
        window.alert(err.error);
      })
    }
  }

  loadAll(){
    this.gardensService.getGardens().subscribe(data => {
      this.gardens = data;
    }, err => {
      window.alert(err.error);
    });
  }

  loadForUser(user: String){
    this.gardensService.getGardensByUser(user).subscribe(data => {
      this.gardens = data;
    }, err => {
      window.alert(err.error);
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreateGarden', { state: {user: this.listFor}});
  }

  onEdit(garden : Garden){
    this.router.navigateByUrl('/EditGarden', { state: garden });
  }
  onDelete(garden : Garden){
    this.gardensService.deleteGarden(garden._id, garden.userID).subscribe(data => {
      this.gardens.splice(this.gardens.indexOf(garden),1);
    }, err => {
      window.alert(err.error);
      this.gardens.splice(this.gardens.indexOf(garden),1);
    });
  }
  onDetails(garden : Garden){
    this.router.navigateByUrl('/DetailsGarden', { state: garden });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
