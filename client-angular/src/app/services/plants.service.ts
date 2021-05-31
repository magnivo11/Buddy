import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  private plantUrl = environment.plantUrl;

  constructor(private http: HttpClient) { }
  
  filterAdmin(key: string): Observable<any> {
    const url = `${this.plantUrl}/byAdmin/filter/${key}`;
    return this.http.get<any>(url);
  }

  filterUser(key: string): Observable<any> {
    const url = `${this.plantUrl}/ByUser/filter/${key}`;
    return this.http.get<any>(url);
  }

  getPlants(): Observable<any> {
    return this.http.get<any>(this.plantUrl);
  }

  getAdminPlants(): Observable<any> {
    const url = `${this.plantUrl}/admin`;
    return this.http.get<any>(url);
  }

  getAllUsersPlants(): Observable<any> {
    const url = `${this.plantUrl}/user`;
    return this.http.get<any>(url);
  }

  getNumOfPlants(): Observable<Number> {
    const url = `${this.plantUrl}/count`;
    return this.http.get<Number>(url);
  }

  getPlantsByGarden(gardenID: String): Observable<any> {
    const url = `${this.plantUrl}/byGarden/${gardenID}`;
    return this.http.get<any>(url);
  }

  addPlant(species: String, irrigationInstructors: String, optimalTemp: Number, optimalSoilMoisture: Number, optimalSunExposure: Number, description: String): Observable<any> {
    return this.http.post<any>(this.plantUrl, { 
      species: species, 
      irrigationInstructors: irrigationInstructors, 
      optimalTemp: optimalTemp, 
      optimalSoilMoisture: optimalSoilMoisture, 
      optimalSunExposure: optimalSunExposure, 
      description: description, 
    });
  }

  addPlantForUser(species: String, garden: String, growthStatus: String): Observable<any> {
    const url = `${this.plantUrl}/ByUser`;

    return this.http.post<any>(url, { 
      isUserPlant: true,
      species: species, 
      GardenID: garden, 
      growthStatus: growthStatus, 
    });
  }

  getPlant(id: String): Observable<any> {
    const url = `${this.plantUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updatePlant(Plant: Plant): Observable<any> {
    const url = `${this.plantUrl}/byAdmin`;
    return this.http.put<any>(url, Plant);
  }

  updateUserPlant(Plant: Plant): Observable<any> {
    const url = `${this.plantUrl}/byuser`;
    return this.http.put<any>(url, Plant);
  }

  deletePlant(PlantID: String, GardenID: String): Observable<any> {
    const url = `${this.plantUrl}/byAdmin`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        plantID: PlantID,
        GardenID: GardenID
      },
    };
    return this.http.delete<any>(url, options);
  }
}