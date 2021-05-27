import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photoUrl = environment.photoUrl;

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoUrl);
  }

  getSelectedPhotos(name: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoUrl + '/scrape/' + name);
  }
  deletePhoto(id: string): Observable<Photo> {
    return this.http.delete<Photo>(this.photoUrl + '/' + id);
  }

  filter(key: string): Observable<any> {
    const url = `${this.photoUrl}/scrapes/${key}`;
    return this.http.get<any>(url);
  }
}
