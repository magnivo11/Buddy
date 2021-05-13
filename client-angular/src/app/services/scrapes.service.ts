import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scrape } from '../models/scrape';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScrapesService {
  private scrapesUrl = environment.scrapesUrl;
  private filterUrl = environment.filtersUrl;

  constructor(private http: HttpClient) {}
  
  filter(key: string): Observable<any> {
    const url = `${this.filterUrl}/scrapes/${key}`;
    return this.http.get<any>(url);
  }

  getScrapes(): Observable<any> {
    return this.http.get<any>(this.scrapesUrl);
  }

  addScrape(title: String, img: String, published: Date,time: Date): Observable<any> {
    return this.http.post<any>(this.scrapesUrl, { title: title, img: img ,published: published ,time: time});
  }

  getScrape(id: number): Observable<any> {
    const url = `${this.scrapesUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateScrape(scrape: Scrape): Observable<any> {
    const url = `${this.scrapesUrl}/${scrape._id}`;
    return this.http.patch<any>(url, { title: scrape.title, img: scrape.img  , published: scrape.published ,time: scrape.time});
  }

  deleteScrape(id: number): Observable<any> {
    const url = `${this.scrapesUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  deleteAllScrape(): Observable<any> {
    return this.http.delete<any>(this.scrapesUrl);
  }

  scrape(): Observable<any> {
    const url = `${this.scrapesUrl}/scrape`;
    return this.http.get<any>(url);
  }
}