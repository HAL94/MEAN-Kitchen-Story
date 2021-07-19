import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.interface';
import { Product } from 'src/app/models/product.interface';
import { UserRole } from 'src/app/models/user-roles.enum';
import { UserService } from 'src/app/services/user.service';
import { CartAddRequest } from 'src/app/_utils/http-models/cart-add-request.interface';
import { CartAddResponse } from 'src/app/_utils/http-models/cart-add-response.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart: Cart = {
    items: [],
    totalPrice: 0
  };
  cart$ = new BehaviorSubject<Cart>(this.cart);

  constructor(private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService) { 
      
    }

  resetCart() {
    this.cart = {
      items: [],
      totalPrice: 0
    };
    this.cart$.next(this.cart);
  }
  
  getCart() {
    if (!this.authService.auth) {
      return;
    }

    if (!this.userService.user || this.userService.user.role === UserRole.Admin) {
      return;
    }

    this.http.get(environment.HTTP_URLS.CART).subscribe((cart: Cart) => {      
      if (!cart) {
        return;
      }
      this.cart = cart;
      this.cart$.next({...this.cart});      
    });
  }

  deleteCart(cartId: string) {
    return this.http.delete(environment.HTTP_URLS.CART_DELETE + cartId);
  }

  addToCart(product: Product, qt: number) {
    if (!this.authService.auth) {
      this.router.navigate(['/auth']);
      return;
    }
    const item: CartItem = {
      product: product,
      qt: qt,
      itemPrice: qt * product.price
    }
    
    const orderIndex = this.cart.items.findIndex((it) => {      
      return it.product.id === item.product.id
    });


    if (orderIndex === -1) {
      this.cart.items.push(item);
    } else {
      const orderEdit = {...this.cart.items[orderIndex]};
      orderEdit.qt += item.qt
      orderEdit.itemPrice = orderEdit.product.price * orderEdit.qt;
      this.cart.items[orderIndex] = {...orderEdit};
    }

    this.cart.totalPrice += item.itemPrice;

    const addCartRequest: CartAddRequest = {
      items: this.cart.items.map((item) => {
        return {
          product: item.product.id,
          qt: item.qt,
          itemPrice: item.itemPrice
        }
      }),
      totalPrice: this.cart.totalPrice
    }
    
    return this.http.put<CartAddResponse>(environment.HTTP_URLS.CART, addCartRequest);    
  }

  removeFromCart(index: number) {

    const orderToRemove = {...this.cart.items[index]};
    this.cart.items.splice(index, 1);
    this.cart.totalPrice -= orderToRemove.itemPrice;

    const cartAddRequest: CartAddRequest = {
      items: this.cart.items.map((item) => {
        return {
          product: item.product.id,
          qt: item.qt,
          itemPrice: item.itemPrice
        }
      }),
      totalPrice: this.cart.totalPrice
    }

    this.http.put<CartAddResponse>(environment.HTTP_URLS.CART, cartAddRequest)
      .subscribe((response) => {
        if (response.result) {
          this.setCart();
        }
      })
  }

  updateCart(item: CartItem, index: number) {
    this.cart.items[index] = {...item};
    let newTotalPrice = 0;
    const cartAddRequest: CartAddRequest = {
      items: this.cart.items.map((item) => {
        newTotalPrice += (item.itemPrice);
        return {
          product: item.product.id,
          qt: item.qt,
          itemPrice: item.itemPrice
        }
      }),
      totalPrice: newTotalPrice
    }
    this.cart.totalPrice = newTotalPrice;

    this.http.put<CartAddResponse>(environment.HTTP_URLS.CART, cartAddRequest)
    .subscribe((response) => {
      if (response.result) {
        this.setCart();
      }
    })    
  }

  setCart() {    
    this.cart$.next({...this.cart});
  }
}
