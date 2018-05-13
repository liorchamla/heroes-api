import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';
import { AuthData } from './auth-data';
import { User } from './user.model';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private loginEndpoint = environment.endpoints.login;
  private registerEndpoint = environment.endpoints.register;

  user: User;
  authState = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {
    this.tokenService.restoreToken();
    this.user = this.tokenService.user;
  }

  getToken() {
    return this.tokenService.getToken();
  }

  isAuthenticated(): boolean {
    return (this.user !== null && this.user !== undefined);
  }

  login(username: string, password: string) {
    return this.http.post(this.loginEndpoint, { username, password })
      .map((authData: AuthData) => {
        this.tokenService.storeToken(authData);
        this.user = this.tokenService.user;
        this.authState.next(true);
        return true;
      });
  }

  logout() {
    this.user = null;
    this.authState.next(false);
    this.tokenService.deleteToken();
  }

  register(email: string, username: string, password: string) {
    return this.http.post(this.registerEndpoint, { email, username, password });
  }



}
