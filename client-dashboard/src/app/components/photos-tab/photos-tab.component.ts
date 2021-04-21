import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plantModel';
import { Photo } from '../../models/photoModel';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
   

@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent {
  photosList: Photo[] = []
  photoCount!: number;
  plantsList: Plant[] = []
  name = 'Lilly'
  userName: String = '';


  constructor(private user: UserService, private router: Router,private photoService: PhotoService, private plantsService: PlantService) {
    this.getAdminPlants()
    this.user.home()
    .subscribe(
      data => this.addName(data),
      error => this.router.navigate(['/login'])
    )
  }

  selectName(event: any) {
    this.name = event.target.value

  }
  getAllSelectedPhotos() {
    this.photoService.getSelectedPhotos(this.name).subscribe((photos) => { this.photosList = photos });
  }

  choosenPhoto(photo: Photo) {
for (var i=0 ; i<this.plantsList.length ; i++)    {
      if ((this.plantsList[i].species).localeCompare(photo.name)==0)
      {
        console.log(this.plantsList[i].species);
        console.log(this.plantsList[i]._id);
        console.log(photo._id);
        this.plantsService.updatePlant(this.plantsList[i]._id,photo._id).subscribe(()=>{});
      }
    } 
  }

  deletePhoto(selectedPhotoID: string) {
    this.photoService.deletePhoto(selectedPhotoID).subscribe(() => { });
  }

  getAllPhotos() {
    this.photoService.getPhotos().subscribe((photos) => {
      this.photosList = photos
      this.photoCount = photos.length;
      console.log(this.photosList);
    })
  }
  getAdminPlants() {
    this.plantsService.getAdminPlants().subscribe((plants) => {
      this.plantsList = plants
    })
  }
  
addName(data: any) {
  console.log(data);
  this.userName = data.name; 
}
logout() {
  this.user.logout()
    .subscribe(
      data => { console.log(data); this.router.navigate(['/login']) },
      error => console.error(error)
    )
}
}
