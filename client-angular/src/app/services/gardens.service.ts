import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Garden } from '../models/Garden';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GardensService {
  private gardenUrl = environment.gardenUrl;

  constructor(private http: HttpClient) { }
  
  filter(key: string): Observable<any> {
    const url = `${this.gardenUrl}/filter/${key}`;
    return this.http.get<any>(url);
  }

  getGardens(): Observable<any> {
    return this.http.get<any>(this.gardenUrl);
  }

  getNumOfGardens(): Observable<Number> {
    const url = `${this.gardenUrl}/count`;
    return this.http.get<Number>(url);
  }

  getGardensByUser(userID: String): Observable<any> {
    const url = `${this.gardenUrl}/${userID}`;
    return this.http.get<any>(url);
  }

  addGarden(name: String, direction: String, directSun: boolean, surroundings: String, userID: String): Observable<any> {
    return this.http.post<any>(this.gardenUrl, { 
      name: name, 
      direction: direction, 
      directSun: directSun, 
      surroundings: surroundings, 
      userID: userID,
    });
  }

  getGarden(id: String): Observable<any> {
    const url = `${this.gardenUrl}/find/${id}`;
    return this.http.get<any>(url);
  }

  updateGarden(garden: Garden): Observable<any> {
    return this.http.put<any>(this.gardenUrl, garden);
  }

  deleteGarden(gardenID: String, userID: String): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        gardenID: gardenID,
        userID: userID,
      },
    };
    return this.http.delete<any>(this.gardenUrl, options);
  }
}