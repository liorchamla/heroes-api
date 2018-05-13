import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { User } from './auth/user.model';

@Injectable()
export class SecurityService {

  constructor(private auth: AuthService) {}

  hasRole(role: string) {
    if (!this.auth.user) return false;

    return this.auth.user.roles.includes(role);
  }
}
