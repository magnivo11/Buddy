import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
/*
  private source = new BehaviorSubject(null);
  currentUser = this.source.asObservable();

  constructor() { }

  changeCurrentArticle(user: User) {
    this.source.next(user);
  }
  */
}
