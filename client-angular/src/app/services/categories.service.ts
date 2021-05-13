import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private categoriesUrl = environment.categoriesUrl;
  private filtersUrl = environment.filtersUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getNumOfCategories(): Observable<Number> {
    const url = `${this.categoriesUrl}/count`;
    return this.http.get<Number>(url);
  }

  filter(key: string): Observable<any> {
    const url = `${this.filtersUrl}/categories/${key}`;
    return this.http.get<any>(url);
  }

  addCategory(name: string): Observable<any> {
    return this.http.post<any>(this.categoriesUrl, { name: name });
  }

  getCategory(id: String): Observable<any> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateCategory(category: Category): Observable<any> {
    const url = `${this.categoriesUrl}/${category._id}`;
    return this.http.patch<any>(url, { name: category.name });
  }

  deleteCategory(id: String): Observable<any> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
