import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart.interface';
import { CartService } from '../../main-app/cart/cart.service';

@Component({
  selector: 'app-main-checkout',
  templateUrl: './main-checkout.component.html',
  styleUrls: ['./main-checkout.component.css']
})

export class MainCheckoutComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  subscription: Subscription;

  constructor(private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {     
    this.route.params
    .subscribe((params) => {
      if (params['cartId'] !== this.cartService.cart.id) {
        this.router.navigate(['/']);        
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
