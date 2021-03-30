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

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoURL);
  }

  getSelectedPhotos(name: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoURL + '/scrape/' + name);
  }
  deletePhoto(id: string): Observable<Photo> {
    return this.http.delete<Photo>(this.photoURL + '/' + id);
  }
}
