import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;
  private userObs$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  set user(user: User) {
    this._user = user;
    this.userObs$.next(this._user);
  }

  get user() {
    return this._user;
  }

  get userObs() {
    return this.userObs$;
  }

  async fetchUser(userId: string) {
    const fetchedUser = await this.http.get<User>(environment.HTTP_URLS.GET_USER + userId).toPromise();    
    this.user = fetchedUser;
    // console.log('user fetched', this._user);
  }

}
