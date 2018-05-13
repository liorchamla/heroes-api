import { CartService } from './../shopping-cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from './heroes.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private route: ActivatedRoute, private cart: CartService) { }

  ngOnInit() {
    this.heroes = this.route.snapshot.data['heroes'];
  }

  addToCart(hero: Hero) {
    this.cart.addItem(hero);
  }

}
