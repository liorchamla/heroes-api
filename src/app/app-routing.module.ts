import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HeroesResolver } from './heroes/heroes.resolver';
import { HeroDetailsComponent } from './heroes/hero-details/hero-details.component';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard], resolve: { heroes: HeroesResolver } },
  { path: 'heroes/new', component: HeroFormComponent, canActivate: [AuthGuard] },
  { path: 'heroes/:id', component: HeroDetailsComponent, canActivate: [AuthGuard] },
  { path: 'heroes/:id/edit', component: HeroFormComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/:id', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
