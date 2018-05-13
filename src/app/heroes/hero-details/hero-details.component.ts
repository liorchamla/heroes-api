import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Hero } from '../hero';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit, OnDestroy {

  hero$: Observable<Hero>;

  private subscriptions: Subscription[] = [];

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    public security: SecurityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe((params: Params) => {
        const id = +params.get('id');
        this.hero$ = this.heroesService.getHero(id);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onRemove(hero: Hero) {
    this.subscriptions.push(
      this.heroesService.removeHero(hero).subscribe(
        result => {
          this.router.navigateByUrl('/heroes');
        },
        error => {
          console.log('Error !');
        }
      )
    );
  }

}
