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


constructor(private http: HttpClient) {}
}
