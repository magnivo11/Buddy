import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statistic } from '../models/statistic';
import { environment } from '../../environments/environment';
//import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private CommentUrl = environment.commentUrl;
  private plantUrl = environment.plantUrl;

  constructor(private http: HttpClient) { }

  
  getPlantsStatistic(): Observable<any> {
    const url = `${this.plantUrl}/gardenPlants`;
    return this.http.get<any>(url);
  }
  
  getPostsStatistic(): Observable<any>{
    const url = `${this.CommentUrl}/postComments`;
    return this.http.get<any>(url);
  }
}
