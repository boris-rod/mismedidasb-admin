import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStatsSharedService {
  private registeredSubject = new Subject<User>();
  private activedSubject = new Subject<User>();
  private disabledSubject = new Subject<User>();

  sendRegisteredUser(user: User): void {
    this.registeredSubject.next(user);
  }

  getRegisteredUserSubject(): Observable<User> {
    return this.registeredSubject.asObservable();
  }

  sendActivatedUser(user: User): void {
    this.activedSubject.next(user);
  }

  getActivedUserSubject(): Observable<User> {
    return this.activedSubject.asObservable();
  }

  sendDisabledUser(user: User): void {
    this.disabledSubject.next(user);
  }

  getDisabledUserSubject(): Observable<User> {
    return this.disabledSubject.asObservable();
  }
}
