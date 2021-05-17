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
  
  filter(key: string): Observable<any> {
    const url = `${this.plantUrl}/filter/${key}`;
    return this.http.get<any>(url);
  }

  getPlants(): Observable<any> {
    return this.http.get<any>(this.plantUrl);
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

  getPlant(id: String): Observable<any> {
    const url = `${this.plantUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updatePlant(Plant: Plant): Observable<any> {
    const url = `${this.plantUrl}/byAdmin`;
    return this.http.put<any>(url, Plant);
  }

  deletePlant(PlantID: String, userID: String): Observable<any> {
    const url = `${this.plantUrl}/byAdmin`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        PlantID: PlantID,
      },
    };
    return this.http.delete<any>(url, options);
  }
}