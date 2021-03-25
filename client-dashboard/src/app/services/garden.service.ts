import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Garden } from '../models/gardenModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GardenService {
  private gardensUrl = environment.gardenUrl;

  constructor(private http: HttpClient) {
    
   }

   getGardens(): Observable<Garden[]> {
    return this.http.get<Garden[]>(this.gardensUrl);
  }

  getSelectedGardens(direction: String,directSun:boolean,surroundings:string): Observable<Garden[]> {

    const url = `${this.gardensUrl}/${direction}/${directSun}/${surroundings}`;
    console.log(url)
    return this.http.get<Garden[]>(url);
  }
}
