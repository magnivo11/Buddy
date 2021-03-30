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
  name = 'Lilly'

  constructor(private photoService: PhotoService, private plantsService: PlantService) {
    this.getAdminPlants()
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
}