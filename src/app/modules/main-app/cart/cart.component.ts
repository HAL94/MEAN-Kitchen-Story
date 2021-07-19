import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.interface';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  updateItem(item: CartItem, index: number, op: string) {
    if (item.qt === 1 && op === '-') {
      return;
    }

    if (op === '+') {
      item.qt++;
    } else if (op === '-') {
      item.qt--;
    }
    
    item.itemPrice = item.product.price * item.qt;

    this.cartService.updateCart(item, index);

  }

}
