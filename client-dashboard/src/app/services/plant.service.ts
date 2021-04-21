import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plantModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private plantURL = environment.plantUrl;


  constructor(private http: HttpClient) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.plantURL);
  }

  getAdminPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.plantURL + '/admin');
  }
  getPopularity(): Observable<any> {
    return this.http.get<any>(this.plantURL + '/popularity/all');
   } 

  updatePlant(id: any, defaultPhotoID: any): Observable<Plant> {
    return this.http.put<Plant>(this.plantURL + '/byAdmin/', { id: id, defaultPhotoID: defaultPhotoID });
  }
}
