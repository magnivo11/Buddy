import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  private plantUrl = environment.plantUrl;

  constructor(private http: HttpClient) { }

 
  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.plantUrl);
  }

  // addAdminPlant(): Observable<Plant> {
  //   return this.http.post<Plant>(this.plantUrl);
  // }

  getPlantById(id: string): Observable<Plant> {
    const url = `${this.plantUrl}/${id}`;
    return this.http.get<Plant>(url);
  }


 
}