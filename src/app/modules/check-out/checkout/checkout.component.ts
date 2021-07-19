import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.interface';
import { Order } from 'src/app/models/order.interface';
import { PaymentDetails } from 'src/app/models/payment-details.interface';
import { CartAddResponse } from 'src/app/_utils/http-models/cart-add-response.interface';
import { OrderAddResponse } from 'src/app/_utils/http-models/order-add-response.interface';
import { CartService } from '../../main-app/cart/cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  cart: Cart;
  isLoading = false;

  @ViewChild('paymentForm') form: NgForm;

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartService.cart$.subscribe((cart) => this.cart = cart);
  }

  onSubmitOrder() {
    const paymentDetails: PaymentDetails = {
      cardHolderName: this.form.value.cardHolderName,
      cardNumber: this.form.value.cardNumber,
      cardExpiration: this.form.value.cardExpiration,
      ccv: this.form.value.ccv,
      address: this.form.value.address,
      locale: this.form.value.locale,
      city: this.form.value.city,
      postalCode: this.form.value.postalCode,
      country: this.form.value.country
    }
    
    this.isLoading = true;
    this.orderService.placeOrder(this.cart, paymentDetails)
    .subscribe((response: OrderAddResponse) => {
      if (response.result) {
        this.isLoading = false;
        this.router.navigate(['checkout', this.cart.id, 'confirmation']);
      }

    });
  }
}
