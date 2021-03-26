import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plantModel';
import { Photo } from '../../models/photoModel';


@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent {
  photosList: Photo[] = []
  photoCount!: number;
  plantsList: Plant[] = []
   name = 'Ivy'

  constructor(private photoService: PhotoService, private plantsService: PlantService) {
    this.getAdminPlants()
  }

  selectName(event: any) {
    this.name = event.target.value

  }
  getAllSelectedPhotos() {
    this.photoService.getSelectedPhotos(this.name).subscribe((photos) => { this.photosList = photos });
  }

  choosenPhoto() {
     
  }

  deletePhoto(selectedPhotoID: string) {
     this.photoService.deletePhoto(selectedPhotoID).subscribe(()=>{});
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
}