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

  private filtersUrl = environment.filtersUrl;

  constructor(private http: HttpClient) { }

  
  getCategoriesStatistic(): Observable<any> {
    const url = `${this.filtersUrl}/categories`;
    return this.http.get<any>(url);
  }
  
  getArticlesStatistic(): Observable<any>{
    const url = `${this.filtersUrl}/articleComments`;
    return this.http.get<any>(url);
  }
}
