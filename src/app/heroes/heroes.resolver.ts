import { Observable } from 'rxjs/Observable';
import { HeroesService } from './heroes.service';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Hero } from './hero';

@Injectable()
export class HeroesResolver implements Resolve<Hero[]> {
    constructor(private heroesService: HeroesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hero[]> {
        return this.heroesService.getHeroes();
    }
}
