import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Sensors } from '../models/sensors';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private sensorUrl = environment.sensorUrl;

  constructor(private http: HttpClient) { }
  
  filter(key: string): Observable<any> {
    const url = `${this.sensorUrl}/filter/${key}`;
    return this.http.get<any>(url);
  }

  getSensors(): Observable<any> {
    return this.http.get<any>(this.sensorUrl);
  }

  addSensor(plantID: String): Observable<any> {
    return this.http.post<any>(this.sensorUrl, { 
      plantID: plantID
    });
  }

  getSensor(id: String): Observable<any> {
    const url = `${this.sensorUrl}/find/${id}`;
    return this.http.get<any>(url);
  }

  updateSensor(SensorsID: String, plantID: String): Observable<any> {
    const url = `${this.sensorUrl}/${SensorsID}`;
    return this.http.put<any>(url, {plantID: plantID});
  }

  deleteSensor(SensorID: String): Observable<any> {
    const url = `${this.sensorUrl}/byAdmin`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: SensorID,
      },
    };
    return this.http.delete<any>(url, options);
  }
}