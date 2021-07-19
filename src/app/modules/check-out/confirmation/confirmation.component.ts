import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.interface';
import { CartService } from '../../main-app/cart/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  cart: Cart;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnDestroy() {    
    this.cartService.resetCart()
  }
  

}
