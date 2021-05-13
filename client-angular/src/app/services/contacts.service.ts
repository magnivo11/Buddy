import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class ContactsService {
  private contactsUrl = environment.contactsUrl;
  private filterUrl = environment.filtersUrl;

  constructor(private http: HttpClient) {}
  
  filter(key: string): Observable<any> {
    const url = `${this.filterUrl}/contacts/${key}`;
    return this.http.get<any>(url);
  }

  getContacts(): Observable<any> {
    return this.http.get<any>(this.contactsUrl);
  }

  addContact(fullName: String, email: String, message: String): Observable<any> {
    return this.http.post<any>(this.contactsUrl, { fullName: fullName, email: email, message: message });
  }

  getContact(id: String): Observable<any> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateContact(contact: Contact): Observable<any> {
    const url = `${this.contactsUrl}/${contact._id}`;
    return this.http.patch<any>(url, { fullName: contact.fullName, email: contact.email, message: contact.message });
  }

  deleteContact(id: String): Observable<any> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
