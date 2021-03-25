import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../models/photoModel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
private photoURL = environment.photoUrl;

constructor(private http: HttpClient) {}
}
