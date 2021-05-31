import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RealTimeService {
  
  currentActiveUsersCounter = this.socket.fromEvent<Number>('countActiveUsers');
  currentAdminPlantsCounter = this.socket.fromEvent<Number>('countAdminPlants');
  currentUserPlantsCounter = this.socket.fromEvent<Number>('countUserPlants');
  currentPostsCounter = this.socket.fromEvent<Number>('countPosts');
  private usersUrl = environment.usersUrl;

  constructor(private socket: Socket, private http: HttpClient) {
  }

  getNumOfActiveUsers(): Observable<Number> {
    const url = `${this.usersUrl}/count/active`;
    return this.http.get<Number>(url);
  }
}
