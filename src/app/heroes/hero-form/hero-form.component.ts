import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Hero } from '../hero';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit, OnDestroy {
  hero: Hero = {
    name: '',
    description: '',
    image: ''
  };
  id: number;
  loading = false;

  private subscriptions: Subscription[] = [];

  constructor(private heroesService: HeroesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe((params: Params) => {
        const id = +params.get('id');
        if (id) this.setUpHero(id);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSave(form: NgForm) {
    this.loading = true;
    const hero: Hero = form.value;
    if (this.id) {
      this.updateAndRedirect(hero);
    } else {
      this.createAndRedirect(hero);
    }
  }

  private createAndRedirect(hero: Hero) {
    this.subscriptions.push(
      this.heroesService.createHero(hero).subscribe(newHero => {
        this.redirect(newHero);
      })
    );
  }

  private updateAndRedirect(hero: Hero) {
    hero.id = this.id;
    this.subscriptions.push(
      this.heroesService.updateHero(hero).subscribe((updatedHero: Hero) => {
        this.redirect(updatedHero);
      })
    );
  }

  private redirect(hero: Hero) {
    this.router.navigateByUrl('/heroes/' + hero.id);
  }

  private setUpHero(id: number) {
    this.subscriptions.push(
      this.heroesService.getHero(id).subscribe((hero: Hero) => this.hero = hero)
    );
    this.id = id;
  }

}
