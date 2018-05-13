import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Hero } from './hero';

@Injectable()
export class HeroesService {
  httpOptions;
  apiUrl = environment.endpoints.api + '/heroes';
  heroes: Hero[];

  constructor(private http: HttpClient, private auth: AuthService) { }

  getHeroes() {
    if (this.heroes) return Observable.of(this.heroes);

    return this.http.get(this.apiUrl).map((heroes: Hero[]) => {
      this.heroes = heroes;
      return this.heroes;
    });
  }

  getHero(id: number) {
    if (this.heroes) return Observable.of(this.findHero(id));

    return this.http.get(this.apiUrl + '/' + id).map((hero: Hero) => hero);
  }

  updateHero(hero: Hero) {
    if (this.heroes) this.replaceHero(hero);

    return this.http.patch(this.apiUrl + '/' + hero.id, hero);
  }

  createHero(hero: Hero) {
    return this.http.post(this.apiUrl, hero).map((newHero: Hero) => {
      if (this.heroes) this.heroes.push(newHero);

      return newHero;
    });
  }

  removeHero(hero: Hero) {
    return this.http.delete(this.apiUrl + '/' + hero.id).map(result => {
      const index = this.heroes.findIndex(h => h.id === hero.id);
      this.heroes.splice(index, 1);
      return result;
    });
  }

  private findHero(id: number) {
    return this.heroes.find(h => h.id === id);
  }

  private replaceHero(hero: Hero) {
    const index = this.heroes.findIndex(h => h.id === hero.id);
    const oldHero = this.heroes[index];
    this.heroes[index] = { ...oldHero, ...hero };
  }

}
