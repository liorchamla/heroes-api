import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TokenService {

  token: string;
  user: User;
  tokenChanged = new Subject<string>();
  private refreshEndpoint = environment.endpoints.refresh;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  storeToken(authData: AuthData) {
    this.token = authData.token;
    this.tokenChanged.next(this.token);
    this.user = authData.user;
    window.localStorage.setItem('jwtToken', this.token);
    window.localStorage.setItem('jwtUser', JSON.stringify(this.user));
  }

  deleteToken() {
    this.token = null;
    this.user = null;
    this.tokenChanged.next(null);
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('jwtUser');
  }

  restoreToken() {
    const token = window.localStorage.getItem('jwtToken');
    const user = window.localStorage.getItem('jwtUser');

    if (token) {
      if (user) this.user = JSON.parse(user);
      this.token = token;
      this.tokenChanged.next(token);
    }

    window.setTimeout(() => this.refreshToken(), 150);
    window.setInterval(() => this.refreshToken(), 900000);
  }

  refreshToken() {
    if (this.token) {
      this.http.get(this.refreshEndpoint)
        .subscribe((authData: AuthData) => {
          this.storeToken(authData);
        }, (error) => {
          this.deleteToken();
          this.router.navigateByUrl('/login');
        });
    }
  }
}
