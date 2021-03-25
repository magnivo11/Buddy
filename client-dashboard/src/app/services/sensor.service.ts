import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensorModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

private sensorURL = environment.sensorUrl;

constructor(private http: HttpClient) {}

getSensors(): Observable<Sensor[]> {
  return this.http.get<Sensor[]>(this.sensorURL);
}

}
