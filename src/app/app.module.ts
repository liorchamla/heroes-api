import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdminGuard } from './admin.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenService } from './auth/token.service';
import { HeroesService } from './heroes/heroes.service';
import { HeroDetailsComponent } from './heroes/hero-details/hero-details.component';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';
import { HeroResolver } from './heroes/hero.resolver';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesResolver } from './heroes/heroes.resolver';
import { SecurityService } from './security.service';
import { TokenInterceptor } from './token.interceptor';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartService } from './shopping-cart/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroFormComponent,
    HeroDetailsComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    UsersComponent,
    UserFormComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HeroesService,
    AuthService,
    AuthGuard,
    SecurityService,
    UsersService,
    AdminGuard,
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    HeroesResolver,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
