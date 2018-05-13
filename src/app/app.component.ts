import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { SecurityService } from './security.service';
import { CartService } from './shopping-cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User;
  show = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    public security: SecurityService,
    public cart: CartService
  ) { }

  ngOnInit() {
    this.user = this.auth.user;

    this.auth.authState.subscribe(state => {
      if (state) this.user = this.auth.user;
      else this.user = null;

      console.log(this.user);
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
