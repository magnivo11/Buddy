import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Garden } from '../../models/garden';
import { GardensService } from '../../services/gardens.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gardens-list',
  templateUrl: './gardens-list.component.html',
  styleUrls: ['./gardens-list.component.css']
})
export class GardensListComponent implements OnInit {

  gardens : Garden[] = [];  
  @Input() userFor: String = '';
  @Input() listFor: String = '';
  @Input() search: string = '';
  @Input() refresh: string = "false";
  isShow = true;

  constructor(private gardensService : GardensService, private router: Router, private toastrService : ToastrService
    ){}
  
  ngOnInit() {
    if(this.listFor === ''){
      this.isShow = true;
      this.loadAll();
    }
    else if (this.listFor === 'user')
    {
      this.isShow = true;
      this.loadForUser(this.userFor);
    } 
  }
  
  ngOnChanges(changes: String) {
    // changes.prop contains the old and the new value...
    if(this.refresh === "true"){
      this.isShow = true;
      this.loadAll();
    }
    if(this.listFor === "" || this.search === "")
    { 
      this.isShow = true;
      this.loadAll();
    }
    else if(this.listFor === "search")
    { 
      this.gardensService.filter(this.search).subscribe(data =>{
        if(data.length === 0){
          this.isShow = false;
        }
        else{
          this.gardens = data;
        }
      }, err => {
        this.toastrService.error(err.error.errors,'Error');  
      })
    }
  }

  loadAll(){
    this.gardensService.getGardens().subscribe(data => {
      this.gardens = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
    });
  }

  loadForUser(user: String){
    this.gardensService.getGardensByUser(user).subscribe(data => {
      this.gardens = data;
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      this.router.navigate(['/table-list']);
    });
  }

  onCreate(){
    this.router.navigateByUrl('/CreateGarden', { state: {user: this.userFor}});
  }

  onEdit(garden : Garden){
    this.router.navigateByUrl('/EditGarden', { state: garden });
  }
  onDelete(garden : Garden){
    this.gardensService.deleteGarden(garden._id, garden.userID).subscribe(data => {
      this.toastrService.success('Succeess');  
      this.gardens.splice(this.gardens.indexOf(garden),1);
    }, err => {
      this.toastrService.error(err.error.errors,'Error');  
      //this.gardens.splice(this.gardens.indexOf(garden),1);
    });
  }
  onDetails(garden : Garden){
    this.router.navigateByUrl('/DetailsGarden', { state: garden });
  }

  handlePanel(action : string){
    this.loadAll();
  }
}
