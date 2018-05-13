import { Hero } from './../heroes/hero';
import { Injectable } from '@angular/core';

export interface CartItem {
  hero: Hero;
  quantity: number;
}

@Injectable()
export class CartService {

  items: CartItem[] = [];

  get total() {
    return this.items.map(item => item.hero.price * item.quantity).reduce((total, price) => total + price, 0);
  }

  get quantity() {
    return this.items.map(item => item.quantity).reduce((total, quantity) => total + quantity, 0);
  }

  constructor() { }

  addItem(hero: Hero, quantity = 1) {
    const index = this.items.findIndex(item => item.hero.id === hero.id);
    if (index !== -1) {
      this.items[index].quantity += quantity;
    } else {
      this.items.push({ hero, quantity});
    }
  }

}
