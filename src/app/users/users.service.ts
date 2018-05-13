import { User } from './../auth/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class UsersService {

  users: User[];

  constructor(private auth: AuthService, private http: HttpClient) { }

  getRoles() {
    return <Observable<any>>this.http.get(environment.endpoints.api + '/users/roles');
  }

  getUsers() {
    if (this.users) return Observable.of(this.users);

    return <Observable<User[]>>this.http.get(environment.endpoints.api + '/users')
      .map((list: User[]) => {
        this.users = list;
        return this.users;
      });
  }

  createUser(user: User) {
    return this.http.post(environment.endpoints.api + '/users', user);
  }

}
