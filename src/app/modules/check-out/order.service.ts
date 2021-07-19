import { Injectable } from '@angular/core';
import { PaymentDetails } from 'src/app/models/payment-details.interface';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Cart } from 'src/app/models/cart.interface';
import { CartService } from '../main-app/cart/cart.service';
import { Order } from 'src/app/models/order.interface';
import { OrderAddRequest } from 'src/app/_utils/http-models/order-add-request.interface';
import { BehaviorSubject } from 'rxjs';
import { OrderAddResponse } from 'src/app/_utils/http-models/order-add-response.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient,
    private cartService: CartService) { }
  
   

  placeOrder(cart: Cart, payment: PaymentDetails) {
    return this.http.post('http://localhost:3000/api/user-payment', payment)
      .pipe(
        mergeMap((response: any) => {
          if (response.result) {
            return this.cartService.deleteCart(cart.id);
          }
        }),        
        mergeMap((response: any) => {
          if (response.result) {
            const orderAddRequest: OrderAddRequest = {
              items: cart.items.map((item) => {
                return {
                  itemPrice: item.itemPrice,
                  product: item.product.id,
                  qt: item.qt
                }
              }),
              totalPrice: cart.totalPrice
            }
            return this.http.post<OrderAddResponse>('http://localhost:3000/api/order', orderAddRequest)
          }
        })
      );
  }
}
